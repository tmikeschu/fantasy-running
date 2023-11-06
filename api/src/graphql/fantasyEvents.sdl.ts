export const schema = gql`
  type FantasyEvent {
    id: String!
    eventId: String!
    event: Event!
    teamSize: Int!
    fantasyTeams: [FantasyTeam]!
    rules: [FantasyTeamRule]!
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
    ruleIds: [String!]!
  }

  input UpdateFantasyEventInput {
    eventId: String
    teamSize: Int
    ruleIds: [String!]!
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
