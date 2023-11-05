import type { FindFantasyTeamById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FantasyTeam from 'src/components/FantasyTeam/FantasyTeam'

export const QUERY = gql`
  query FindFantasyTeamById($id: String!) {
    fantasyTeam: fantasyTeam(id: $id) {
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

export const Empty = () => <div>FantasyTeam not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  fantasyTeam,
}: CellSuccessProps<FindFantasyTeamById>) => {
  return <FantasyTeam fantasyTeam={fantasyTeam} />
}
