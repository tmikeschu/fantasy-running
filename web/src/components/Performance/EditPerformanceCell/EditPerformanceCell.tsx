import type { EditPerformanceById, UpdatePerformanceInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PerformanceForm from 'src/components/Performance/PerformanceForm'

export const QUERY = gql`
  query EditPerformanceById($id: String!) {
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
const UPDATE_PERFORMANCE_MUTATION = gql`
  mutation UpdatePerformanceMutation(
    $id: String!
    $input: UpdatePerformanceInput!
  ) {
    updatePerformance(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  performance,
}: CellSuccessProps<EditPerformanceById>) => {
  const [updatePerformance, { loading, error }] = useMutation(
    UPDATE_PERFORMANCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Performance updated')
        navigate(routes.performances())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdatePerformanceInput,
    id: EditPerformanceById['performance']['id']
  ) => {
    updatePerformance({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Performance {performance?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PerformanceForm
          performance={performance}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
