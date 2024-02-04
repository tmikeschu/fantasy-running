import type {
  EventRunnerResultRelationResolvers,
  QueryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const fantasyEventConfig: QueryResolvers['fantasyEventConfig'] = async ({
  fantasyEventId,
}) => {
  return db.fantasyEventConfig.findUnique({
    where: { fantasyEventId },
  })
}

export const EventRunnerResult: EventRunnerResultRelationResolvers = {
  fantasyEvent: (_obj, { root }) => {
    return db.fantasyEventConfig
      .findUnique({ where: { id: root?.id } })
      .fantasyEvent()
  },
}
