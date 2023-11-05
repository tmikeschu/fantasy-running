import type { FindFantasyTeams } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FantasyTeams from 'src/components/FantasyTeam/FantasyTeams'

export const QUERY = gql`
  query FindFantasyTeams {
    fantasyTeams {
      id
      name
      userId
      fantasyEventId
      fantasyTeamWagerId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No fantasyTeams yet. '}
      <Link to={routes.newFantasyTeam()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  fantasyTeams,
}: CellSuccessProps<FindFantasyTeams>) => {
  return <FantasyTeams fantasyTeams={fantasyTeams} />
}