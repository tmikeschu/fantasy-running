import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const eventRunnerResults: QueryResolvers['eventRunnerResults'] = ({
  eventId,
}) => {
  return db.eventRunnerResult.findMany({ where: { eventRunner: { eventId } } })
}
