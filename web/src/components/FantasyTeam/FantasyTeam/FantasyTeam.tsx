import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import type {
  DeleteFantasyTeamMutationVariables,
  FindFantasyTeamById,
} from 'types/graphql'

const DELETE_FANTASY_TEAM_MUTATION = gql`
  mutation DeleteFantasyTeamMutation($id: String!) {
    deleteFantasyTeam(id: $id) {
      id
    }
  }
`

interface Props {
  fantasyTeam: NonNullable<FindFantasyTeamById['fantasyTeam']>
}

const FantasyTeam = ({ fantasyTeam }: Props) => {
  const [deleteFantasyTeam] = useMutation(DELETE_FANTASY_TEAM_MUTATION, {
    onCompleted: () => {
      toast.success('FantasyTeam deleted')
      navigate(routes.fantasyTeams())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteFantasyTeamMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete fantasyTeam ' + id + '?')) {
      deleteFantasyTeam({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            FantasyTeam {fantasyTeam.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{fantasyTeam.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{fantasyTeam.name}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{fantasyTeam.userId}</td>
            </tr>
            <tr>
              <th>Fantasy event id</th>
              <td>{fantasyTeam.fantasyEventId}</td>
            </tr>
            <tr>
              <th>Fantasy team wager id</th>
              <td>{fantasyTeam.fantasyTeamWagerId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(fantasyTeam.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(fantasyTeam.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFantasyTeam({ id: fantasyTeam.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(fantasyTeam.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default FantasyTeam
