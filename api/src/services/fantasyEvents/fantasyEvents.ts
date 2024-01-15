import { del } from '@vercel/blob'
import type {
  QueryResolvers,
  MutationResolvers,
  FantasyEventRelationResolvers,
  FrequentlyPickedRunner,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const fantasyEvents: QueryResolvers['fantasyEvents'] = () => {
  return db.fantasyEvent.findMany({
    where: { status: { not: 'COMPLETE' } },
  })
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

export const getFantasyEventStats: QueryResolvers['getFantasyEventStats'] =
  async ({ id }) => {
    const mostFrequentlyPickedMensRunner =
      await getMostFrequentlyPickedRunnerSql({ id, genderDivision: 'men' })

    const mostFrequentlyPickedWomensRunner =
      await getMostFrequentlyPickedRunnerSql({ id, genderDivision: 'women' })

    const teamCount = await db.fantasyTeam.count({
      where: { fantasyEventId: id },
    })

    return {
      mostFrequentlyPickedMensRunner,
      mostFrequentlyPickedWomensRunner,
      teamCount,
    }
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
