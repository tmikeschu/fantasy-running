export const schema = gql`
  type Runner {
    id: String!
    name: String!
    events: [EventRunner!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    genderDivision: String
  }

  type Query {
    runners: [Runner!]! @requireAuth
    runner(id: String!): Runner @requireAuth
  }
`
