import type { EditEventRunnerById, UpdateEventRunnerInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EventRunnerForm from 'src/components/EventRunner/EventRunnerForm'

export const QUERY = gql`
  query EditEventRunnerById($id: String!) {
    eventRunner: eventRunner(id: $id) {
      id
      eventId
      runnerId
      seed
      createdAt
      updatedAt
    }
  }
`
const UPDATE_EVENT_RUNNER_MUTATION = gql`
  mutation UpdateEventRunnerMutation(
    $id: String!
    $input: UpdateEventRunnerInput!
  ) {
    updateEventRunner(id: $id, input: $input) {
      id
      eventId
      runnerId
      seed
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
  eventRunner,
}: CellSuccessProps<EditEventRunnerById>) => {
  const [updateEventRunner, { loading, error }] = useMutation(
    UPDATE_EVENT_RUNNER_MUTATION,
    {
      onCompleted: () => {
        toast.success('EventRunner updated')
        navigate(routes.eventRunners())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateEventRunnerInput,
    id: EditEventRunnerById['eventRunner']['id']
  ) => {
    updateEventRunner({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit EventRunner {eventRunner?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <EventRunnerForm
          eventRunner={eventRunner}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
