export const schema = gql`
  type FantasyEventConfig {
    id: String!
    teamCount: Int
    teamSize: Int
    dnfPoints: Int
    topNPoints: Int
    fantasyEventId: String!
    fantasyEvent: FantasyEvent!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    fantasyEventConfig(fantasyEventId: String!): FantasyEventConfig @requireAuth
  }
`
