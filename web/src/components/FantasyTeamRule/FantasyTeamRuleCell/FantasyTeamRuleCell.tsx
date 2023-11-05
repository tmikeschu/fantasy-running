import type { FindFantasyTeamRuleById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FantasyTeamRule from 'src/components/FantasyTeamRule/FantasyTeamRule'

export const QUERY = gql`
  query FindFantasyTeamRuleById($id: String!) {
    fantasyTeamRule: fantasyTeamRule(id: $id) {
      id
      pickNumberFrom
      pickNumberTo
      rankMin
      rankMax
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>FantasyTeamRule not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  fantasyTeamRule,
}: CellSuccessProps<FindFantasyTeamRuleById>) => {
  return <FantasyTeamRule fantasyTeamRule={fantasyTeamRule} />
}
