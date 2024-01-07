export const schema = gql`
  type FantasyEventPrizeBlob {
    id: String!
    url: String!
    name: String!
    fantasyEventPrizeId: String!
    fantasyEventPrize: FantasyEventPrize!
  }
`
