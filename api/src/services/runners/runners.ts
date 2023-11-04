import type {
  QueryResolvers,
  MutationResolvers,
  RunnerRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const runners: QueryResolvers['runners'] = () => {
  return db.runner.findMany()
}

export const runner: QueryResolvers['runner'] = ({ id }) => {
  return db.runner.findUnique({
    where: { id },
  })
}

export const createRunner: MutationResolvers['createRunner'] = ({ input }) => {
  return db.runner.create({
    data: input,
  })
}

export const updateRunner: MutationResolvers['updateRunner'] = ({
  id,
  input,
}) => {
  return db.runner.update({
    data: input,
    where: { id },
  })
}

export const deleteRunner: MutationResolvers['deleteRunner'] = ({ id }) => {
  return db.runner.delete({
    where: { id },
  })
}

export const Runner: RunnerRelationResolvers = {
  performances: (_obj, { root }) => {
    return db.runner.findUnique({ where: { id: root?.id } }).performances()
  },
  events: (_obj, { root }) => {
    return db.runner.findUnique({ where: { id: root?.id } }).events()
  },
  fantasyTeamMembers: (_obj, { root }) => {
    return db.runner
      .findUnique({ where: { id: root?.id } })
      .fantasyTeamMembers()
  },
}
