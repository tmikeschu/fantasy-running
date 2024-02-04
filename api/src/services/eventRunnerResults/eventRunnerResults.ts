import type {
  EventRunnerResultRelationResolvers,
  QueryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const eventRunnerResults: QueryResolvers['eventRunnerResults'] = async ({
  fantasyEventId,
}) => {
  const eventId = (
    await db.fantasyEvent.findUnique({ where: { id: fantasyEventId } })
  ).eventId

  return db.eventRunnerResult.findMany({
    where: { eventRunner: { eventId } },
    orderBy: { time: 'asc' },
  })
}

export const EventRunnerResult: EventRunnerResultRelationResolvers = {
  eventRunner: (_obj, { root }) => {
    return db.eventRunner.findUnique({ where: { id: root?.eventRunnerId } })
  },
}
