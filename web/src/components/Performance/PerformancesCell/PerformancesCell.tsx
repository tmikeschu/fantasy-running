import type { FindPerformances } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Performances from 'src/components/Performance/Performances'

import EmptyResource from '../../EmptyResource/EmptyResource'

export const QUERY = gql`
  query FindPerformances {
    performances {
      id
      time
      eventId
      runnerId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <EmptyResource newPath={routes.newPerformance()}>performances</EmptyResource>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  performances,
}: CellSuccessProps<FindPerformances>) => {
  return <Performances performances={performances} />
}
