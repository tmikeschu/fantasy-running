import type { FindRunners } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { AdminTableHeader } from 'src/components/Admin/AdminTableWrapper/AdminTableWrapper'
import Runners from 'src/components/Admin/Runner/Runners'
import EmptyResource from 'src/components/EmptyResource/EmptyResource'
import LoadingTable from 'src/components/LoadingTable'

export const QUERY = gql`
  query FindRunners {
    runners {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => (
  <LoadingTable header={<AdminTableHeader>Runners</AdminTableHeader>} />
)

export const Empty = () => <EmptyResource>runners</EmptyResource>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ runners }: CellSuccessProps<FindRunners>) => {
  return <Runners runners={runners} />
}
