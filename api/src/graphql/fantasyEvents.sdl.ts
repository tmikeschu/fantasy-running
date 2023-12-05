export const schema = gql`
  type FantasyEvent {
    id: String!
    eventId: String!
    event: Event!
    teamSize: Int!
    description: String
    fantasyTeams: [FantasyTeam!]!
    rules: [FantasyTeamRule!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    status: FantasyEventStatus!
  }

  enum FantasyEventStatus {
    PENDING
    LIVE
    COMPLETE
  }

  type Query {
    fantasyEvents: [FantasyEvent!]! @requireAuth
    fantasyEvent(id: String!): FantasyEvent @requireAuth
  }

  input CreateFantasyEventInput {
    eventId: String!
    teamSize: Int!
    description: String
    ruleIds: [String!]!
    status: FantasyEventStatus
  }

  input UpdateFantasyEventInput {
    eventId: String!
    teamSize: Int!
    description: String
    ruleIds: [String!]!
    status: FantasyEventStatus
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
