import type { FindFantasyEvents } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FantasyEvents from 'src//components/AdminFantasyEvent/FantasyEvents'
import EmptyResource from 'src/components/EmptyResource/EmptyResource'

export const QUERY = gql`
  query FindFantasyEvents {
    fantasyEvents {
      id
      eventId
      event {
        name
      }
      teamSize
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <EmptyResource newPath={routes.newFantasyEvent()}>
    fantasy events
  </EmptyResource>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  fantasyEvents,
}: CellSuccessProps<FindFantasyEvents>) => {
  return <FantasyEvents fantasyEvents={fantasyEvents} />
}
