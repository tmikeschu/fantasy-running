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

export const myFantasyTeams: QueryResolvers['myFantasyTeams'] = ({
  ownerId: userId,
}) => {
  return db.fantasyTeam.findMany({ where: { userId } })
}

export const createFantasyTeam: MutationResolvers['createFantasyTeam'] = ({
  input,
  members,
}) => {
  const { userId, fantasyEventId, name } = input
  return db.fantasyTeam.create({
    data: {
      name,
      fantasyEvent: { connect: { id: fantasyEventId } },
      owner: { connect: { id: userId } },
      wager: { create: { wager: 0 } },
      teamMembers: {
        createMany: {
          data: members.map((member) => ({
            eventRunnerId: member.eventRunnerId,
            pickNumber: member.seed,
          })),
        },
      },
    },
  })
}

export const updateFantasyTeam: MutationResolvers['updateFantasyTeam'] =
  async ({ id, input: { name }, members }) => {
    await db.fantasyTeamMember.deleteMany({
      where: { fantasyTeamId: id },
    })
    return db.fantasyTeam.update({
      where: { id },
      data: {
        name,
        teamMembers: {
          createMany: {
            data: members.map((member) => ({
              eventRunnerId: member.eventRunnerId,
              pickNumber: member.seed,
            })),
          },
        },
      },
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

  teamMembers: (_obj, { root }) => {
    return db.fantasyTeam.findUnique({ where: { id: root?.id } }).teamMembers()
  },
  fantasyEvent: (_obj, { root }) => {
    return db.fantasyTeam.findUnique({ where: { id: root?.id } }).fantasyEvent()
  },
  wager: (_obj, { root }) => {
    return db.fantasyTeam.findUnique({ where: { id: root?.id } }).wager()
  },
}
