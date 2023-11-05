import type { EditRunnerById, UpdateRunnerInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RunnerForm from 'src/components/Runner/RunnerForm'

export const QUERY = gql`
  query EditRunnerById($id: String!) {
    runner: runner(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`
const UPDATE_RUNNER_MUTATION = gql`
  mutation UpdateRunnerMutation($id: String!, $input: UpdateRunnerInput!) {
    updateRunner(id: $id, input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ runner }: CellSuccessProps<EditRunnerById>) => {
  const [updateRunner, { loading, error }] = useMutation(
    UPDATE_RUNNER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Runner updated')
        navigate(routes.runners())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateRunnerInput,
    id: EditRunnerById['runner']['id']
  ) => {
    updateRunner({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Runner {runner?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <RunnerForm
          runner={runner}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
