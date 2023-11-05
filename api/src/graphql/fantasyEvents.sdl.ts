export const schema = gql`
  type FantasyEvent {
    id: String!
    eventId: String!
    event: Event!
    teamSize: Int!
    fantasyTeams: [FantasyTeam]!
    rules: [FantasyTeamRulesOnFantasyEvents]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    fantasyEvents: [FantasyEvent!]! @requireAuth
    fantasyEvent(id: String!): FantasyEvent @requireAuth
  }

  input CreateFantasyEventInput {
    eventId: String!
    teamSize: Int!
  }

  input UpdateFantasyEventInput {
    eventId: String
    teamSize: Int
  }

  type Mutation {
    createFantasyEvent(input: CreateFantasyEventInput!): FantasyEvent!
      @requireAuth
    updateFantasyEvent(
      id: String!
      input: UpdateFantasyEventInput!
    ): FantasyEvent! @requireAuth
    deleteFantasyEvent(id: String!): FantasyEvent! @requireAuth
  }
`