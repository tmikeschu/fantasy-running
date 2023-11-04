import type {
  QueryResolvers,
  MutationResolvers,
  FantasyTeamRulesOnFantasyEventsRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const fantasyTeamRulesOnFantasyEventses: QueryResolvers['fantasyTeamRulesOnFantasyEventses'] =
  () => {
    return db.fantasyTeamRulesOnFantasyEvents.findMany()
  }

export const fantasyTeamRulesOnFantasyEvents: QueryResolvers['fantasyTeamRulesOnFantasyEvents'] =
  ({ id }) => {
    return db.fantasyTeamRulesOnFantasyEvents.findUnique({
      where: { id },
    })
  }

export const createFantasyTeamRulesOnFantasyEvents: MutationResolvers['createFantasyTeamRulesOnFantasyEvents'] =
  ({ input }) => {
    return db.fantasyTeamRulesOnFantasyEvents.create({
      data: input,
    })
  }

export const updateFantasyTeamRulesOnFantasyEvents: MutationResolvers['updateFantasyTeamRulesOnFantasyEvents'] =
  ({ id, input }) => {
    return db.fantasyTeamRulesOnFantasyEvents.update({
      data: input,
      where: { id },
    })
  }

export const deleteFantasyTeamRulesOnFantasyEvents: MutationResolvers['deleteFantasyTeamRulesOnFantasyEvents'] =
  ({ id }) => {
    return db.fantasyTeamRulesOnFantasyEvents.delete({
      where: { id },
    })
  }

export const FantasyTeamRulesOnFantasyEvents: FantasyTeamRulesOnFantasyEventsRelationResolvers =
  {
    fantasyTeamRule: (_obj, { root }) => {
      return db.fantasyTeamRulesOnFantasyEvents
        .findUnique({ where: { id: root?.id } })
        .fantasyTeamRule()
    },
    fantasyEvent: (_obj, { root }) => {
      return db.fantasyTeamRulesOnFantasyEvents
        .findUnique({ where: { id: root?.id } })
        .fantasyEvent()
    },
  }
