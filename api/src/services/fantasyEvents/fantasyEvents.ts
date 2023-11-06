import type {
  QueryResolvers,
  MutationResolvers,
  FantasyEventRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const fantasyEvents: QueryResolvers['fantasyEvents'] = () => {
  return db.fantasyEvent.findMany()
}

export const fantasyEvent: QueryResolvers['fantasyEvent'] = ({ id }) => {
  return db.fantasyEvent.findUnique({
    where: { id },
  })
}

export const createFantasyEvent: MutationResolvers['createFantasyEvent'] =
  async ({ input: { ruleIds, ...input } }) => {
    // todo create rule associations
    const fantasyEvent = await db.fantasyEvent.create({
      data: input,
    })

    await db.fantasyTeamRulesOnFantasyEvents.createMany({
      data: ruleIds.map((ruleId) => ({
        fantasyEventId: fantasyEvent.id,
        fantasyTeamRuleId: ruleId,
      })),
    })

    return fantasyEvent
  }

export const updateFantasyEvent: MutationResolvers['updateFantasyEvent'] = ({
  id,
  input,
}) => {
  return db.fantasyEvent.update({
    data: input,
    where: { id },
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
}
