export const schema = gql`
  type EventRunnerResult {
    id: String!
    eventRunnerId: String!
    time: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    eventRunner: EventRunner!
  }

  type Query {
    eventRunnerResults(eventId: String!): [EventRunnerResult!]! @requireAuth
  }
`
