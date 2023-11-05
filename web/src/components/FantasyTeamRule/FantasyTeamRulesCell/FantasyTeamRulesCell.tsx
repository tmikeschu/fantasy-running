import type { FindFantasyTeamRules } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EmptyResource from 'src/components/EmptyResource/EmptyResource'
import FantasyTeamRules from 'src/components/FantasyTeamRule/FantasyTeamRules'

export const QUERY = gql`
  query FindFantasyTeamRules {
    fantasyTeamRules {
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

export const Empty = () => (
  <EmptyResource newPath={routes.newFantasyTeamRule()}>
    fantasy team rules
  </EmptyResource>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  fantasyTeamRules,
}: CellSuccessProps<FindFantasyTeamRules>) => {
  return <FantasyTeamRules fantasyTeamRules={fantasyTeamRules} />
}
