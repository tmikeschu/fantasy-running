import type { FindRunners } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EmptyResource from 'src/components/EmptyResource/EmptyResource'
import Runners from 'src/components/Runner/Runners'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <EmptyResource newPath={routes.newRunner()}>runners</EmptyResource>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ runners }: CellSuccessProps<FindRunners>) => {
  return <Runners runners={runners} />
}
