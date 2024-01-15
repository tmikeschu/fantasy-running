export const schema = gql`
  type Event {
    id: String!
    name: String!
    date: DateTime!
    location: String!
    eventRunners: [EventRunner!]!
    fantasyEvents: [FantasyEvent!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    events: [Event!]! @requireAuth
    event(id: String!): Event @requireAuth
  }

  input CreateEventInput {
    name: String!
    date: DateTime!
    location: String!
  }

  input UpdateEventInput {
    name: String
    date: DateTime
    location: String
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event! @requireAuth
    updateEvent(id: String!, input: UpdateEventInput!): Event! @requireAuth
    deleteEvent(id: String!): Event! @requireAuth
  }
`
