import type { FindPerformanceById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Performance from 'src/components/Performance/Performance'

export const QUERY = gql`
  query FindPerformanceById($id: String!) {
    performance: performance(id: $id) {
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

export const Empty = () => <div>Performance not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  performance,
}: CellSuccessProps<FindPerformanceById>) => {
  return <Performance performance={performance} />
}
