export const schema = gql`
  type EventRunner {
    id: String!
    eventId: String!
    event: Event!
    runnerId: String!
    runner: Runner!
    seed: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    seedNotes: String
    fantasyTeams: [FantasyTeamMember!]!
    result: EventRunnerResult
  }

  type Query {
    eventRunners: [EventRunner!]! @requireAuth
    eventRunner(id: String!): EventRunner @requireAuth
  }

  input CreateEventRunnerInput {
    eventId: String!
    runnerId: String!
    seed: Int!
  }

  input UpdateEventRunnerInput {
    eventId: String
    runnerId: String
    seed: Int
  }

  type Mutation {
    createEventRunner(input: CreateEventRunnerInput!): EventRunner! @requireAuth
    updateEventRunner(
      id: String!
      input: UpdateEventRunnerInput!
    ): EventRunner! @requireAuth
    deleteEventRunner(id: String!): EventRunner! @requireAuth
  }
`
