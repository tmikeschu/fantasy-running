import type { FindEventById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Event from 'src/components/Event/Event'

import ErrorAlert from '../../ErrorAlert/ErrorAlert'

export const QUERY = gql`
  query FindEventById($id: String!) {
    event: event(id: $id) {
      id
      name
      date
      location
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Event not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <ErrorAlert message={error.message} />
)

export const Success = ({ event }: CellSuccessProps<FindEventById>) => {
  return <Event event={event} />
}
