export const schema = gql`
  type FantasyTeam {
    id: String!
    name: String
    owner: User!
    userId: String!
    FantasyTeamMember: [FantasyTeamMember]!
    FantasyEvent: FantasyEvent
    fantasyEventId: String
    fantasyTeamWagerId: String!
    wager: FantasyTeamWager
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    fantasyTeams: [FantasyTeam!]! @requireAuth
    fantasyTeam(id: String!): FantasyTeam @requireAuth
  }

  input FantasyTeamMemberInput {
    eventRunnerId: String!
    seed: Int!
  }

  input CreateFantasyTeamInput {
    name: String
    userId: String!
    fantasyEventId: String!
    venmoHandle: String!
  }

  input UpdateFantasyTeamInput {
    name: String
    userId: String!
    fantasyEventId: String!
    venmoHandle: String!
  }

  type Mutation {
    createFantasyTeam(
      input: CreateFantasyTeamInput!
      members: [FantasyTeamMemberInput!]!
    ): FantasyTeam! @requireAuth
    updateFantasyTeam(
      id: String!
      input: UpdateFantasyTeamInput!
      members: [FantasyTeamMemberInput!]!
    ): FantasyTeam! @requireAuth
    deleteFantasyTeam(id: String!): FantasyTeam! @requireAuth
  }
`
