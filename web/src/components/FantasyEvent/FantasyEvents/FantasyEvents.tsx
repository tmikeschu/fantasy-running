import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/FantasyEvent/FantasyEventsCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteFantasyEventMutationVariables,
  FindFantasyEvents,
} from 'types/graphql'

const DELETE_FANTASY_EVENT_MUTATION = gql`
  mutation DeleteFantasyEventMutation($id: String!) {
    deleteFantasyEvent(id: $id) {
      id
    }
  }
`

const FantasyEventsList = ({ fantasyEvents }: FindFantasyEvents) => {
  const [deleteFantasyEvent] = useMutation(DELETE_FANTASY_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('FantasyEvent deleted')
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

  const onDeleteClick = (id: DeleteFantasyEventMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete fantasyEvent ' + id + '?')) {
      deleteFantasyEvent({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Event id</th>
            <th>Team size</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {fantasyEvents.map((fantasyEvent) => (
            <tr key={fantasyEvent.id}>
              <td>{truncate(fantasyEvent.id)}</td>
              <td>{truncate(fantasyEvent.eventId)}</td>
              <td>{truncate(fantasyEvent.teamSize)}</td>
              <td>{timeTag(fantasyEvent.createdAt)}</td>
              <td>{timeTag(fantasyEvent.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.fantasyEvent({ id: fantasyEvent.id })}
                    title={'Show fantasyEvent ' + fantasyEvent.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editFantasyEvent({ id: fantasyEvent.id })}
                    title={'Edit fantasyEvent ' + fantasyEvent.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete fantasyEvent ' + fantasyEvent.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(fantasyEvent.id)}
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

export default FantasyEventsList
