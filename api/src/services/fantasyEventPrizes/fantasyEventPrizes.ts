import type { FantasyEventPrizeRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const FantasyEventPrize: FantasyEventPrizeRelationResolvers = {
  blobs: (_obj, { root }) => {
    return db.fantasyEventPrize.findUnique({ where: { id: root?.id } }).blobs()
  },
}
