export const schema = gql`
  type FantasyTeamRule {
    id: String!
    pickNumberFrom: Int!
    pickNumberTo: Int!
    rankMin: Int!
    rankMax: Int
    events: [FantasyEvent]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    fantasyTeamRules: [FantasyTeamRule!]! @requireAuth
    fantasyTeamRule(id: String!): FantasyTeamRule @requireAuth
  }

  input CreateFantasyTeamRuleInput {
    pickNumberFrom: Int!
    pickNumberTo: Int!
    rankMin: Int!
    rankMax: Int
  }

  input UpdateFantasyTeamRuleInput {
    pickNumberFrom: Int!
    pickNumberTo: Int!
    rankMin: Int!
    rankMax: Int
  }

  type Mutation {
    createFantasyTeamRule(input: CreateFantasyTeamRuleInput!): FantasyTeamRule!
      @requireAuth
    updateFantasyTeamRule(
      id: String!
      input: UpdateFantasyTeamRuleInput!
    ): FantasyTeamRule! @requireAuth
    deleteFantasyTeamRule(id: String!): FantasyTeamRule! @requireAuth
  }
`
