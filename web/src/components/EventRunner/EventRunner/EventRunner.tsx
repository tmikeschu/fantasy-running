import type {
  DeleteEventRunnerMutationVariables,
  FindEventRunnerById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_EVENT_RUNNER_MUTATION = gql`
  mutation DeleteEventRunnerMutation($id: String!) {
    deleteEventRunner(id: $id) {
      id
    }
  }
`

interface Props {
  eventRunner: NonNullable<FindEventRunnerById['eventRunner']>
}

const EventRunner = ({ eventRunner }: Props) => {
  const [deleteEventRunner] = useMutation(DELETE_EVENT_RUNNER_MUTATION, {
    onCompleted: () => {
      toast.success('EventRunner deleted')
      navigate(routes.eventRunners())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteEventRunnerMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete eventRunner ' + id + '?')) {
      deleteEventRunner({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            EventRunner {eventRunner.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{eventRunner.id}</td>
            </tr>
            <tr>
              <th>Event id</th>
              <td>{eventRunner.eventId}</td>
            </tr>
            <tr>
              <th>Runner id</th>
              <td>{eventRunner.runnerId}</td>
            </tr>
            <tr>
              <th>Seed</th>
              <td>{eventRunner.seed}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(eventRunner.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(eventRunner.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editEventRunner({ id: eventRunner.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(eventRunner.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default EventRunner
