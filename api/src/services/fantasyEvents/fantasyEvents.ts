import type {
  QueryResolvers,
  MutationResolvers,
  FantasyEventRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const fantasyEvents: QueryResolvers['fantasyEvents'] = () => {
  return db.fantasyEvent.findMany({
    where: { status: { not: 'COMPLETE' } },
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
        prizes: { select: { id: true } },
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

    return db.fantasyEvent.update({
      where: { id },
      data: {
        ...input,
        rules: {
          disconnect: current.rules.map((rule) => ({ id: rule.id })),
          connect: ruleIds.map((id) => ({ id })),
        },
        prizes: {
          // TODO delete vercel blobs
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
