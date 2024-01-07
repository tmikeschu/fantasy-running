export const schema = gql`
  type FantasyEvent {
    id: String!
    eventId: String!
    event: Event!
    name: String
    teamSize: Int!
    teamCount: Int!
    description: String
    fantasyTeams: [FantasyTeam!]!
    rules: [FantasyTeamRule!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    status: FantasyEventStatus!
    prizes: [FantasyEventPrize!]!
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
    teamCount: Int!
    name: String
    description: String
    ruleIds: [String!]!
    status: FantasyEventStatus
    prizes: [FantasyPrizeInput!]!
  }

  input UpdateFantasyEventInput {
    eventId: String!
    teamSize: Int!
    teamCount: Int!
    name: String
    description: String
    ruleIds: [String!]!
    status: FantasyEventStatus
    prizes: [FantasyPrizeInput!]!
  }

  input FantasyPrizeInput {
    id: String
    name: String!
    description: String
    rank: Int!
    blobs: [PrizeBlobInput!]!
  }

  input PrizeBlobInput {
    id: String
    name: String!
    url: String!
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
