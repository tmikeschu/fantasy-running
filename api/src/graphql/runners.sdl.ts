export const schema = gql`
  type Runner {
    id: String!
    name: String!
    performances: [Performance]!
    events: [EventRunner!]!
    fantasyTeamMembers: [FantasyTeamMember]!
    createdAt: DateTime!
    updatedAt: DateTime!
    genderDivision: String
  }

  type Query {
    runners: [Runner!]! @requireAuth
    runner(id: String!): Runner @requireAuth
  }

  input CreateRunnerInput {
    name: String!
  }

  input UpdateRunnerInput {
    name: String
  }

  type Mutation {
    createRunner(input: CreateRunnerInput!): Runner! @requireAuth
    updateRunner(id: String!, input: UpdateRunnerInput!): Runner! @requireAuth
    deleteRunner(id: String!): Runner! @requireAuth
  }
`
