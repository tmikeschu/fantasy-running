import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/EventRunner/EventRunnersCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteEventRunnerMutationVariables,
  FindEventRunners,
} from 'types/graphql'

const DELETE_EVENT_RUNNER_MUTATION = gql`
  mutation DeleteEventRunnerMutation($id: String!) {
    deleteEventRunner(id: $id) {
      id
    }
  }
`

const EventRunnersList = ({ eventRunners }: FindEventRunners) => {
  const [deleteEventRunner] = useMutation(DELETE_EVENT_RUNNER_MUTATION, {
    onCompleted: () => {
      toast.success('EventRunner deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteEventRunnerMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete eventRunner ' + id + '?')) {
      deleteEventRunner({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Event id</th>
            <th>Runner id</th>
            <th>Seed</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {eventRunners.map((eventRunner) => (
            <tr key={eventRunner.id}>
              <td>{truncate(eventRunner.id)}</td>
              <td>{truncate(eventRunner.eventId)}</td>
              <td>{truncate(eventRunner.runnerId)}</td>
              <td>{truncate(eventRunner.seed)}</td>
              <td>{timeTag(eventRunner.createdAt)}</td>
              <td>{timeTag(eventRunner.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.eventRunner({ id: eventRunner.id })}
                    title={'Show eventRunner ' + eventRunner.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editEventRunner({ id: eventRunner.id })}
                    title={'Edit eventRunner ' + eventRunner.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete eventRunner ' + eventRunner.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(eventRunner.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EventRunnersList
