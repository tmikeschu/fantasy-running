import type { FindEventRunners } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EventRunners from 'src/components/EventRunner/EventRunners'

export const QUERY = gql`
  query FindEventRunners {
    eventRunners {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No eventRunners yet. '}
      <Link to={routes.newEventRunner()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  eventRunners,
}: CellSuccessProps<FindEventRunners>) => {
  return <EventRunners eventRunners={eventRunners} />
}
