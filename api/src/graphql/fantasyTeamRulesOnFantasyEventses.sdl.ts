export const schema = gql`
  type FantasyTeamRulesOnFantasyEvents {
    id: String!
    fantasyTeamRuleId: String!
    fantasyTeamRule: FantasyTeamRule!
    fantasyEventId: String!
    fantasyEvent: FantasyEvent!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    fantasyTeamRulesOnFantasyEventses: [FantasyTeamRulesOnFantasyEvents!]!
      @requireAuth
    fantasyTeamRulesOnFantasyEvents(
      id: String!
    ): FantasyTeamRulesOnFantasyEvents @requireAuth
  }

  input CreateFantasyTeamRulesOnFantasyEventsInput {
    fantasyTeamRuleId: String!
    fantasyEventId: String!
  }

  input UpdateFantasyTeamRulesOnFantasyEventsInput {
    fantasyTeamRuleId: String
    fantasyEventId: String
  }

  type Mutation {
    createFantasyTeamRulesOnFantasyEvents(
      input: CreateFantasyTeamRulesOnFantasyEventsInput!
    ): FantasyTeamRulesOnFantasyEvents! @requireAuth
    updateFantasyTeamRulesOnFantasyEvents(
      id: String!
      input: UpdateFantasyTeamRulesOnFantasyEventsInput!
    ): FantasyTeamRulesOnFantasyEvents! @requireAuth
    deleteFantasyTeamRulesOnFantasyEvents(
      id: String!
    ): FantasyTeamRulesOnFantasyEvents! @requireAuth
  }
`
