import type { CreateRunnerInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RunnerForm from 'src/components/Runner/RunnerForm'

const CREATE_RUNNER_MUTATION = gql`
  mutation CreateRunnerMutation($input: CreateRunnerInput!) {
    createRunner(input: $input) {
      id
    }
  }
`

const NewRunner = () => {
  const [createRunner, { loading, error }] = useMutation(
    CREATE_RUNNER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Runner created')
        navigate(routes.runners())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateRunnerInput) => {
    createRunner({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Runner</h2>
      </header>
      <div className="rw-segment-main">
        <RunnerForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRunner
