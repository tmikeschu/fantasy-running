export const schema = gql`
  type FantasyTeamMember {
    id: String!
    fantasyTeamId: String!
    fantasyTeam: FantasyTeam!
    runnerId: String!
    runner: Runner!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    fantasyTeamMembers: [FantasyTeamMember!]! @requireAuth
    fantasyTeamMember(id: String!): FantasyTeamMember @requireAuth
  }

  input CreateFantasyTeamMemberInput {
    fantasyTeamId: String!
    runnerId: String!
  }

  input UpdateFantasyTeamMemberInput {
    fantasyTeamId: String
    runnerId: String
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
