import type { QueryResolvers, RunnerRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const runners: QueryResolvers['runners'] = () => {
  return db.runner.findMany()
}

export const runner: QueryResolvers['runner'] = ({ id }) => {
  return db.runner.findUnique({
    where: { id },
  })
}

export const Runner: RunnerRelationResolvers = {
  events: (_obj, { root }) => {
    return db.runner.findUnique({ where: { id: root?.id } }).events()
  },
}
