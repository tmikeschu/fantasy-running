import type {
  QueryResolvers,
  MutationResolvers,
  FantasyTeamMemberRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const fantasyTeamMembers: QueryResolvers['fantasyTeamMembers'] = () => {
  return db.fantasyTeamMember.findMany()
}

export const fantasyTeamMember: QueryResolvers['fantasyTeamMember'] = ({
  id,
}) => {
  return db.fantasyTeamMember.findUnique({
    where: { id },
  })
}

export const createFantasyTeamMember: MutationResolvers['createFantasyTeamMember'] =
  ({ input }) => {
    return db.fantasyTeamMember.create({
      data: input,
    })
  }

export const updateFantasyTeamMember: MutationResolvers['updateFantasyTeamMember'] =
  ({ id, input }) => {
    return db.fantasyTeamMember.update({
      data: input,
      where: { id },
    })
  }

export const deleteFantasyTeamMember: MutationResolvers['deleteFantasyTeamMember'] =
  ({ id }) => {
    return db.fantasyTeamMember.delete({
      where: { id },
    })
  }

export const FantasyTeamMember: FantasyTeamMemberRelationResolvers = {
  fantasyTeam: (_obj, { root }) => {
    return db.fantasyTeamMember
      .findUnique({ where: { id: root?.id } })
      .fantasyTeam()
  },
  runner: (_obj, { root }) => {
    return db.fantasyTeamMember.findUnique({ where: { id: root?.id } }).runner()
  },
}
