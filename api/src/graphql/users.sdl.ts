export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    fantasyTeams: [FantasyTeam!]!
    roles: [Role!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    avatarUrl: String
  }

  enum Role {
    USER
    ADMIN
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String
    role: Role!
  }

  input UpdateUserInput {
    email: String
    name: String
    role: Role
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
