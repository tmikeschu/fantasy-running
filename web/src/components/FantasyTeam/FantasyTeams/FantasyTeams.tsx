import type {
  DeleteFantasyTeamMutationVariables,
  FindFantasyTeams,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/FantasyTeam/FantasyTeamsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_FANTASY_TEAM_MUTATION = gql`
  mutation DeleteFantasyTeamMutation($id: String!) {
    deleteFantasyTeam(id: $id) {
      id
    }
  }
`

const FantasyTeamsList = ({ fantasyTeams }: FindFantasyTeams) => {
  const [deleteFantasyTeam] = useMutation(DELETE_FANTASY_TEAM_MUTATION, {
    onCompleted: () => {
      toast.success('FantasyTeam deleted')
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

  const onDeleteClick = (id: DeleteFantasyTeamMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete fantasyTeam ' + id + '?')) {
      deleteFantasyTeam({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>User id</th>
            <th>Fantasy event id</th>
            <th>Fantasy team wager id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {fantasyTeams.map((fantasyTeam) => (
            <tr key={fantasyTeam.id}>
              <td>{truncate(fantasyTeam.id)}</td>
              <td>{truncate(fantasyTeam.name)}</td>
              <td>{truncate(fantasyTeam.userId)}</td>
              <td>{truncate(fantasyTeam.fantasyEventId)}</td>
              <td>{truncate(fantasyTeam.fantasyTeamWagerId)}</td>
              <td>{timeTag(fantasyTeam.createdAt)}</td>
              <td>{timeTag(fantasyTeam.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.fantasyTeam({ id: fantasyTeam.id })}
                    title={'Show fantasyTeam ' + fantasyTeam.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editFantasyTeam({ id: fantasyTeam.id })}
                    title={'Edit fantasyTeam ' + fantasyTeam.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete fantasyTeam ' + fantasyTeam.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(fantasyTeam.id)}
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

export default FantasyTeamsList
