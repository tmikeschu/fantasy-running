import type { FindRunnerById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Runner from 'src/components/Runner/Runner'

export const QUERY = gql`
  query FindRunnerById($id: String!) {
    runner: runner(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Runner not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ runner }: CellSuccessProps<FindRunnerById>) => {
  return <Runner runner={runner} />
}
