export const schema = gql`
  type FantasyTeamWager {
    id: String!
    wager: Float!
    fantasyTeamId: String!
    fantasyTeam: FantasyTeam!
    createdAt: DateTime!
    updatedAt: DateTime!
    venmoHandle: String
  }

  type Query {
    fantasyTeamWagers: [FantasyTeamWager!]! @requireAuth
    fantasyTeamWager(id: String!): FantasyTeamWager @requireAuth
  }

  input CreateFantasyTeamWagerInput {
    wager: Float!
    fantasyTeamId: String!
  }

  input UpdateFantasyTeamWagerInput {
    wager: Float
    fantasyTeamId: String
  }

  type Mutation {
    createFantasyTeamWager(
      input: CreateFantasyTeamWagerInput!
    ): FantasyTeamWager! @requireAuth
    updateFantasyTeamWager(
      id: String!
      input: UpdateFantasyTeamWagerInput!
    ): FantasyTeamWager! @requireAuth
    deleteFantasyTeamWager(id: String!): FantasyTeamWager! @requireAuth
  }
`
