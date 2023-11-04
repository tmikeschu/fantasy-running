import type {
  QueryResolvers,
  MutationResolvers,
  FantasyTeamWagerRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const fantasyTeamWagers: QueryResolvers['fantasyTeamWagers'] = () => {
  return db.fantasyTeamWager.findMany()
}

export const fantasyTeamWager: QueryResolvers['fantasyTeamWager'] = ({
  id,
}) => {
  return db.fantasyTeamWager.findUnique({
    where: { id },
  })
}

export const createFantasyTeamWager: MutationResolvers['createFantasyTeamWager'] =
  ({ input }) => {
    return db.fantasyTeamWager.create({
      data: input,
    })
  }

export const updateFantasyTeamWager: MutationResolvers['updateFantasyTeamWager'] =
  ({ id, input }) => {
    return db.fantasyTeamWager.update({
      data: input,
      where: { id },
    })
  }

export const deleteFantasyTeamWager: MutationResolvers['deleteFantasyTeamWager'] =
  ({ id }) => {
    return db.fantasyTeamWager.delete({
      where: { id },
    })
  }

export const FantasyTeamWager: FantasyTeamWagerRelationResolvers = {
  fantasyTeam: (_obj, { root }) => {
    return db.fantasyTeamWager
      .findUnique({ where: { id: root?.id } })
      .fantasyTeam()
  },
}
