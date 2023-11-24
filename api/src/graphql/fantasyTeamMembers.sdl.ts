export const schema = gql`
  type FantasyTeamMember {
    id: String!
    fantasyTeamId: String!
    fantasyTeam: FantasyTeam!
    eventRunnerId: String!
    runner: EventRunner!
    createdAt: DateTime!
    updatedAt: DateTime!
    pickNumber: Int!
  }

  type Query {
    fantasyTeamMembers: [FantasyTeamMember!]! @requireAuth
    fantasyTeamMember(id: String!): FantasyTeamMember @requireAuth
  }

  input CreateFantasyTeamMemberInput {
    fantasyTeamId: String!
    eventRunnerId: String!
    pickNumber: Int!
  }

  input UpdateFantasyTeamMemberInput {
    fantasyTeamId: String
    eventRunnerId: String
    pickNumber: Int
  }

  type Mutation {
    createFantasyTeamMember(
      input: CreateFantasyTeamMemberInput!
    ): FantasyTeamMember! @requireAuth
    updateFantasyTeamMember(
      id: String!
      input: UpdateFantasyTeamMemberInput!
    ): FantasyTeamMember! @requireAuth
    deleteFantasyTeamMember(id: String!): FantasyTeamMember! @requireAuth
  }
`
