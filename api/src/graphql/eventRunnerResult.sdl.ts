export const schema = gql`
  type EventRunnerResult {
    id: String!
    eventRunnerId: String!
    time: String!
    points: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    eventRunner: EventRunner!
  }

  type Query {
    eventRunnerResults(fantasyEventId: String!): [EventRunnerResult!]!
      @requireAuth
  }
`
