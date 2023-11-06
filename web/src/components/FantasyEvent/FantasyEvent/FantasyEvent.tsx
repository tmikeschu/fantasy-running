import type {
  DeleteFantasyEventMutationVariables,
  FindFantasyEventById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_FANTASY_EVENT_MUTATION = gql`
  mutation DeleteFantasyEventMutation($id: String!) {
    deleteFantasyEvent(id: $id) {
      id
    }
  }
`

interface Props {
  fantasyEvent: NonNullable<FindFantasyEventById['fantasyEvent']>
}

const FantasyEvent = ({ fantasyEvent }: Props) => {
  const [deleteFantasyEvent] = useMutation(DELETE_FANTASY_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('FantasyEvent deleted')
      navigate(routes.fantasyEvents())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteFantasyEventMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete fantasyEvent ' + id + '?')) {
      deleteFantasyEvent({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            FantasyEvent {fantasyEvent.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{fantasyEvent.id}</td>
            </tr>
            <tr>
              <th>Event id</th>
              <td>{fantasyEvent.eventId}</td>
            </tr>
            <tr>
              <th>Team size</th>
              <td>{fantasyEvent.teamSize}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(fantasyEvent.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(fantasyEvent.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFantasyEvent({ id: fantasyEvent.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(fantasyEvent.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default FantasyEvent
