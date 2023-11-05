import type { FindEvents } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EmptyResource from 'src/components/EmptyResource/EmptyResource'
import Events from 'src/components/Event/Events'

export const QUERY = gql`
  query FindEvents {
    events {
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

export const Empty = () => {
  return <EmptyResource newPath={routes.newEvent()}>events</EmptyResource>
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ events }: CellSuccessProps<FindEvents>) => {
  return <Events events={events} />
}
