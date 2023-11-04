import type {
  QueryResolvers,
  MutationResolvers,
  FantasyTeamRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const fantasyTeams: QueryResolvers['fantasyTeams'] = () => {
  return db.fantasyTeam.findMany()
}

export const fantasyTeam: QueryResolvers['fantasyTeam'] = ({ id }) => {
  return db.fantasyTeam.findUnique({
    where: { id },
  })
}

export const createFantasyTeam: MutationResolvers['createFantasyTeam'] = ({
  input,
}) => {
  return db.fantasyTeam.create({
    data: input,
  })
}

export const updateFantasyTeam: MutationResolvers['updateFantasyTeam'] = ({
  id,
  input,
}) => {
  return db.fantasyTeam.update({
    data: input,
    where: { id },
  })
}

export const deleteFantasyTeam: MutationResolvers['deleteFantasyTeam'] = ({
  id,
}) => {
  return db.fantasyTeam.delete({
    where: { id },
  })
}

export const FantasyTeam: FantasyTeamRelationResolvers = {
  owner: (_obj, { root }) => {
    return db.fantasyTeam.findUnique({ where: { id: root?.id } }).owner()
  },
  FantasyTeamMember: (_obj, { root }) => {
    return db.fantasyTeam
      .findUnique({ where: { id: root?.id } })
      .FantasyTeamMember()
  },
  FantasyEvent: (_obj, { root }) => {
    return db.fantasyTeam.findUnique({ where: { id: root?.id } }).FantasyEvent()
  },
  wager: (_obj, { root }) => {
    return db.fantasyTeam.findUnique({ where: { id: root?.id } }).wager()
  },
}
