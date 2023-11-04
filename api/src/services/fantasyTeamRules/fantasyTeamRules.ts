import type {
  QueryResolvers,
  MutationResolvers,
  FantasyTeamRuleRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const fantasyTeamRules: QueryResolvers['fantasyTeamRules'] = () => {
  return db.fantasyTeamRule.findMany()
}

export const fantasyTeamRule: QueryResolvers['fantasyTeamRule'] = ({ id }) => {
  return db.fantasyTeamRule.findUnique({
    where: { id },
  })
}

export const createFantasyTeamRule: MutationResolvers['createFantasyTeamRule'] =
  ({ input }) => {
    return db.fantasyTeamRule.create({
      data: input,
    })
  }

export const updateFantasyTeamRule: MutationResolvers['updateFantasyTeamRule'] =
  ({ id, input }) => {
    return db.fantasyTeamRule.update({
      data: input,
      where: { id },
    })
  }

export const deleteFantasyTeamRule: MutationResolvers['deleteFantasyTeamRule'] =
  ({ id }) => {
    return db.fantasyTeamRule.delete({
      where: { id },
    })
  }

export const FantasyTeamRule: FantasyTeamRuleRelationResolvers = {
  events: (_obj, { root }) => {
    return db.fantasyTeamRule.findUnique({ where: { id: root?.id } }).events()
  },
}
