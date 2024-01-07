export const schema = gql`
  type FantasyEventPrize {
    id: String!
    name: String!
    description: String
    fantasyEventId: String!
    rank: Int!
    fantasyEvent: FantasyEvent!
    blobs: [FantasyEventPrizeBlob!]!
  }
`
