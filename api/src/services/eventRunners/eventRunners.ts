import type {
  QueryResolvers,
  MutationResolvers,
  EventRunnerRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const eventRunners: QueryResolvers['eventRunners'] = () => {
  return db.eventRunner.findMany()
}

export const eventRunner: QueryResolvers['eventRunner'] = ({ id }) => {
  return db.eventRunner.findUnique({
    where: { id },
  })
}

export const createEventRunner: MutationResolvers['createEventRunner'] = ({
  input,
}) => {
  return db.eventRunner.create({
    data: input,
  })
}

export const updateEventRunner: MutationResolvers['updateEventRunner'] = ({
  id,
  input,
}) => {
  return db.eventRunner.update({
    data: input,
    where: { id },
  })
}

export const deleteEventRunner: MutationResolvers['deleteEventRunner'] = ({
  id,
}) => {
  return db.eventRunner.delete({
    where: { id },
  })
}

export const EventRunner: EventRunnerRelationResolvers = {
  event: (_obj, { root }) => {
    return db.eventRunner.findUnique({ where: { id: root?.id } }).event()
  },
  runner: (_obj, { root }) => {
    return db.eventRunner.findUnique({ where: { id: root?.id } }).runner()
  },
  result: (_obj, { root }) => {
    return db.eventRunnerResult.findUnique({
      where: { eventRunnerId: root?.id },
    })
  },
}
