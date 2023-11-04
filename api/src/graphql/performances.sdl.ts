export const schema = gql`
  type Performance {
    id: String!
    time: Float!
    eventId: String!
    event: Event!
    runnerId: String!
    runner: Runner!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    performances: [Performance!]! @requireAuth
    performance(id: String!): Performance @requireAuth
  }

  input CreatePerformanceInput {
    time: Float!
    eventId: String!
    runnerId: String!
  }

  input UpdatePerformanceInput {
    time: Float
    eventId: String
    runnerId: String
  }

  type Mutation {
    createPerformance(input: CreatePerformanceInput!): Performance! @requireAuth
    updatePerformance(
      id: String!
      input: UpdatePerformanceInput!
    ): Performance! @requireAuth
    deletePerformance(id: String!): Performance! @requireAuth
  }
`
