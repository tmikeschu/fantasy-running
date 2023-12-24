import type { FindFantasyTeams } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FantasyTeams from 'src/components/Admin/FantasyTeam/FantasyTeams'

export const QUERY = gql`
  query FindFantasyTeams {
    fantasyTeams {
      id
      name
      owner {
        name
        email
      }
      fantasyEvent {
        event {
          name
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">{'No fantasyTeams yet. '}</div>
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  fantasyTeams,
}: CellSuccessProps<FindFantasyTeams>) => {
  return <FantasyTeams fantasyTeams={fantasyTeams} />
}
