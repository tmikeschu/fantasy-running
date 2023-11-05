import type { FindEventRunnerById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EventRunner from 'src/components/EventRunner/EventRunner'

export const QUERY = gql`
  query FindEventRunnerById($id: String!) {
    eventRunner: eventRunner(id: $id) {
      id
      eventId
      runnerId
      seed
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>EventRunner not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  eventRunner,
}: CellSuccessProps<FindEventRunnerById>) => {
  return <EventRunner eventRunner={eventRunner} />
}
