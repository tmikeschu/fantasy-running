import type { FindFantasyEventById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FantasyEvent from 'src/components/FantasyEvent/FantasyEvent'

export const QUERY = gql`
  query FindFantasyEventById($id: String!) {
    fantasyEvent: fantasyEvent(id: $id) {
      id
      eventId
      teamSize
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>FantasyEvent not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  fantasyEvent,
}: CellSuccessProps<FindFantasyEventById>) => {
  return <FantasyEvent fantasyEvent={fantasyEvent} />
}
