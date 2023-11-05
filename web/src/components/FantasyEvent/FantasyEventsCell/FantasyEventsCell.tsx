import type { FindFantasyEvents } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EmptyResource from 'src/components/EmptyResource/EmptyResource'
import FantasyEvents from 'src/components/FantasyEvent/FantasyEvents'

export const QUERY = gql`
  query FindFantasyEvents {
    fantasyEvents {
      id
      eventId
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
