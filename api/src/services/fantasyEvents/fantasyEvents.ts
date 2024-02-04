import { del } from '@vercel/blob'
import type {
  QueryResolvers,
  MutationResolvers,
  FantasyEventRelationResolvers,
  FrequentlyPickedRunner,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const fantasyEvents: QueryResolvers['fantasyEvents'] = () => {
  return db.fantasyEvent.findMany()
}

const getMostFrequentlyPickedRunnerSql = async ({
  id,
  genderDivision,
}: {
  id: string
  genderDivision: string
}): Promise<FrequentlyPickedRunner> => {
  const results = await db.fantasyTeamMember.groupBy({
    by: ['eventRunnerId'],
    where: {
      fantasyTeam: { fantasyEventId: id },
      AND: { runner: { runner: { genderDivision } } },
    },
    _count: {
      eventRunnerId: true,
    },
    orderBy: {
      _count: {
        eventRunnerId: 'desc',
      },
    },
  })
  const top = results.filter(
    (result) => result._count.eventRunnerId === results[0]._count.eventRunnerId
  )
  const runnerName = (
    await db.eventRunner.findMany({
      where: { id: { in: top.map((result) => result.eventRunnerId) } },
      select: { runner: { select: { name: true } } },
    })
  )
    .map((x) => x.runner.name)
    .join(', ')

  return {
    runnerName,
    teamCount: results[0]._count.eventRunnerId,
  }
}

const getTeamByFrequency = async ({
  id,
  genderDivision,
}: {
  id: string
  genderDivision: string
}): Promise<FrequentlyPickedRunner[]> => {
  const runnersMap = Object.fromEntries(
    (
      await db.eventRunner.findMany({
        select: {
          id: true,
          runner: { select: { genderDivision: true, name: true } },
        },
      })
    ).map((runner) => [runner.id, runner])
  )

  return await db.fantasyTeamMember
    .groupBy({
      by: ['pickNumber', 'eventRunnerId'],
      _count: true,
      orderBy: [{ pickNumber: 'asc' }, { _count: { eventRunnerId: 'desc' } }],
      where: {
        fantasyTeam: { fantasyEventId: id },
        runner: { runner: { genderDivision } },
      },
    })
    .then((res) => {
      return res.reduce((acc, el) => {
        if (!acc[el.pickNumber]) {
          acc[el.pickNumber] = []
        }
        if (
          !acc[el.pickNumber][0] ||
          acc[el.pickNumber][0]._count === el._count
        ) {
          acc[el.pickNumber].push(el)
        }
        return acc
      }, {} as Record<number, typeof res>)
    })
    .then((map) =>
      Object.entries(map).map(([_, results]) => {
        return {
          runnerName: results
            .map((result) => runnersMap[result.eventRunnerId].runner.name)
            .join(', '),
          teamCount: results[0]._count,
        }
      })
    )
}

export const getFantasyEventStats: QueryResolvers['getFantasyEventStats'] =
  async ({ id }) => {
    const mostFrequentlyPickedMensRunner =
      await getMostFrequentlyPickedRunnerSql({ id, genderDivision: 'men' })

    const mostFrequentlyPickedWomensRunner =
      await getMostFrequentlyPickedRunnerSql({ id, genderDivision: 'women' })

    const teamCount = await db.fantasyTeam.count({
      where: { fantasyEventId: id },
    })

    const topMensTeamByFrequency = await getTeamByFrequency({
      genderDivision: 'men',
      id,
    })

    const topWomensTeamByFrequency = await getTeamByFrequency({
      genderDivision: 'women',
      id,
    })
    const event = await db.fantasyEvent.findUnique({ where: { id } }).event()

    const timeUntilEventStart = new Date(event.date).getTime() - Date.now()

    return {
      mostFrequentlyPickedMensRunner,
      mostFrequentlyPickedWomensRunner,
      teamCount,
      topMensTeamByFrequency,
      topWomensTeamByFrequency,
      timeUntilEventStart,
    }
  }

export const getFantasyEventTeamsReport: QueryResolvers['getFantasyEventTeamsReport'] =
  async ({ id }) => {
    const fantasyEvent = await db.fantasyEvent.findUnique({
      where: { id },
      select: {
        event: { select: { id: true } },
      },
    })
    const eventId = fantasyEvent.event.id

    const results = await db.eventRunnerResult.findMany({
      where: { eventRunner: { eventId } },
      select: {
        eventRunnerId: true,
        points: true,
        eventRunner: {
          select: {
            runner: { select: { name: true, genderDivision: true } },
          },
        },
      },
      orderBy: { time: 'asc' },
    })

    const mensPoints = results
      .filter((r) => r.eventRunner.runner.genderDivision === 'men')
      .map((r, i) => ({
        id: r.eventRunnerId,
        name: r.eventRunner.runner.name,
        points: r.points ?? i + 1,
      }))

    const womensPoints = results
      .filter((r) => r.eventRunner.runner.genderDivision === 'women')
      .map((r, i) => ({
        id: r.eventRunnerId,
        name: r.eventRunner.runner.name,
        points: r.points ?? i + 1,
      }))

    const eventRunnerPointsById = [...mensPoints, ...womensPoints].reduce(
      (acc, r) => {
        acc[r.id] = r.points
        return acc
      },
      {} as Record<string, number>
    )

    const fantasyTeams = await db.fantasyTeam.findMany({
      where: { fantasyEvent: { eventId } },
      select: {
        id: true,
        name: true,
        owner: { select: { email: true } },
      },
    })

    const members = await db.fantasyTeamMember.findMany({
      where: { fantasyTeam: { fantasyEvent: { eventId } } },
      select: {
        eventRunnerId: true,
        fantasyTeamId: true,
        runner: { select: { runner: { select: { name: true } } } },
      },
    })

    const membersByTeam = members.reduce((acc, member) => {
      if (!acc[member.fantasyTeamId]) {
        acc[member.fantasyTeamId] = []
      }
      acc[member.fantasyTeamId].push(member)
      return acc
    }, {} as Record<string, typeof members>)

    return fantasyTeams.map((team) => {
      const teamMembers = membersByTeam[team.id].map((m) => ({
        name: m.runner.runner.name,
        points: eventRunnerPointsById[m.eventRunnerId],
      }))

      const totalPoints = teamMembers.reduce(
        (acc, m) => acc + (m.points ?? 0),
        0
      )
      const dqed = teamMembers.some((m) => !m.points)

      return {
        teamMembers,
        id: team.id,
        owner: team.owner.email,
        name: team.name,
        dqed,
        totalPoints,
        dnfCount: teamMembers.filter((m) => !m.points).length,
      }
    })
  }

export const fantasyEvent: QueryResolvers['fantasyEvent'] = ({ id }) => {
  return db.fantasyEvent.findUnique({
    where: { id },
  })
}

export const createFantasyEvent: MutationResolvers['createFantasyEvent'] =
  async ({ input: { ruleIds, prizes, ...input } }) => {
    const fantasyEvent = await db.fantasyEvent.create({
      data: {
        ...input,
        rules: {
          connect: ruleIds.map((id) => ({ id })),
        },
      },
    })

    await Promise.all(
      prizes.map((prize) =>
        db.fantasyEventPrize.create({
          data: {
            fantasyEventId: fantasyEvent.id,
            name: prize.name,
            blobs: {
              createMany: {
                data: prize.blobs.map((blob) => ({
                  url: blob.url,
                  name: blob.name,
                })),
              },
            },
            rank: prize.rank,
            description: prize.description,
          },
        })
      )
    )

    return fantasyEvent
  }

export const updateFantasyEvent: MutationResolvers['updateFantasyEvent'] =
  async ({ id, input: { ruleIds, prizes, ...input } }) => {
    const current = await db.fantasyEvent.findUnique({
      where: { id },
      select: {
        rules: { select: { id: true } },
        prizes: { select: { id: true, blobs: true } },
      },
    })

    const currentPrizesMap = new Map(
      current.prizes.map((prize) => [prize.id, prize])
    )
    const prizesMap = new Map(prizes.map((prize) => [prize.id, prize]))
    const deletedPrizes = current.prizes.filter(
      (prize) => !prizesMap.has(prize.id)
    )

    const updatedPrizes = prizes.filter((prize) =>
      currentPrizesMap.has(prize.id)
    )
    const newPrizes = prizes.filter((prize) => !currentPrizesMap.has(prize.id))

    await Promise.all(
      updatedPrizes
        .flatMap((prize) => prize.blobs)
        .map((blob) =>
          db.fantasyEventPrizeBlob.update({
            where: { id: blob.id },
            data: blob,
          })
        )
    )
    await Promise.all(
      updatedPrizes.map(({ blobs: _, ...prize }) =>
        db.fantasyEventPrize.update({
          where: { id: prize.id },
          data: prize,
        })
      )
    )

    await Promise.all(
      newPrizes.map((prize) =>
        db.fantasyEventPrize.create({
          data: {
            fantasyEventId: id,
            name: prize.name,
            blobs: {
              createMany: {
                data: prize.blobs.map((blob) => ({
                  url: blob.url,
                  name: blob.name,
                })),
              },
            },
            rank: prize.rank,
            description: prize.description,
          },
        })
      )
    )

    await Promise.all(
      deletedPrizes.flatMap((prize) => prize.blobs).map((blob) => del(blob.url))
    )

    return db.fantasyEvent.update({
      where: { id },
      data: {
        ...input,
        rules: {
          disconnect: current.rules.map((rule) => ({ id: rule.id })),
          connect: ruleIds.map((id) => ({ id })),
        },
        prizes: {
          deleteMany: deletedPrizes.map((prize) => ({ id: prize.id })),
        },
      },
    })
  }

export const deleteFantasyEvent: MutationResolvers['deleteFantasyEvent'] = ({
  id,
}) => {
  return db.fantasyEvent.delete({
    where: { id },
  })
}

export const FantasyEvent: FantasyEventRelationResolvers = {
  event: (_obj, { root }) => {
    return db.fantasyEvent.findUnique({ where: { id: root?.id } }).event()
  },
  fantasyTeams: (_obj, { root }) => {
    return db.fantasyEvent
      .findUnique({ where: { id: root?.id } })
      .fantasyTeams()
  },
  rules: (_obj, { root }) => {
    return db.fantasyEvent.findUnique({ where: { id: root?.id } }).rules()
  },
  prizes: (_obj, { root }) => {
    return db.fantasyEvent.findUnique({ where: { id: root?.id } }).prizes()
  },
}
