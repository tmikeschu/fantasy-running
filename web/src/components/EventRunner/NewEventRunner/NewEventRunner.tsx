import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EventRunnerForm from 'src/components/EventRunner/EventRunnerForm'

import type { CreateEventRunnerInput } from 'types/graphql'

const CREATE_EVENT_RUNNER_MUTATION = gql`
  mutation CreateEventRunnerMutation($input: CreateEventRunnerInput!) {
    createEventRunner(input: $input) {
      id
    }
  }
`

const NewEventRunner = () => {
  const [createEventRunner, { loading, error }] = useMutation(
    CREATE_EVENT_RUNNER_MUTATION,
    {
      onCompleted: () => {
        toast.success('EventRunner created')
        navigate(routes.eventRunners())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateEventRunnerInput) => {
    createEventRunner({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New EventRunner</h2>
      </header>
      <div className="rw-segment-main">
        <EventRunnerForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewEventRunner
