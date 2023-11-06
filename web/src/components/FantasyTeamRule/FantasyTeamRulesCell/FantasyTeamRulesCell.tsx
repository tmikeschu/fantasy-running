import type { FindFantasyTeamRules } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { AdminTableHeader } from 'src/components/AdminTableWrapper/AdminTableWrapper'
import EmptyResource from 'src/components/EmptyResource/EmptyResource'
import FantasyTeamRules from 'src/components/FantasyTeamRule/FantasyTeamRules'
import LoadingTable from 'src/components/LoadingTable/LoadingTable'

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

export const Loading = () => (
  <LoadingTable
    header={<AdminTableHeader>Fantasy Team Rules</AdminTableHeader>}
  />
)

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
