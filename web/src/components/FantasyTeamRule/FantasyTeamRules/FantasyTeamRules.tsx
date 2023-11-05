import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/FantasyTeamRule/FantasyTeamRulesCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteFantasyTeamRuleMutationVariables,
  FindFantasyTeamRules,
} from 'types/graphql'

const DELETE_FANTASY_TEAM_RULE_MUTATION = gql`
  mutation DeleteFantasyTeamRuleMutation($id: String!) {
    deleteFantasyTeamRule(id: $id) {
      id
    }
  }
`

const FantasyTeamRulesList = ({ fantasyTeamRules }: FindFantasyTeamRules) => {
  const [deleteFantasyTeamRule] = useMutation(
    DELETE_FANTASY_TEAM_RULE_MUTATION,
    {
      onCompleted: () => {
        toast.success('FantasyTeamRule deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (id: DeleteFantasyTeamRuleMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete fantasyTeamRule ' + id + '?')
    ) {
      deleteFantasyTeamRule({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Pick number from</th>
            <th>Pick number to</th>
            <th>Rank min</th>
            <th>Rank max</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {fantasyTeamRules.map((fantasyTeamRule) => (
            <tr key={fantasyTeamRule.id}>
              <td>{truncate(fantasyTeamRule.id)}</td>
              <td>{truncate(fantasyTeamRule.pickNumberFrom)}</td>
              <td>{truncate(fantasyTeamRule.pickNumberTo)}</td>
              <td>{truncate(fantasyTeamRule.rankMin)}</td>
              <td>{truncate(fantasyTeamRule.rankMax)}</td>
              <td>{timeTag(fantasyTeamRule.createdAt)}</td>
              <td>{timeTag(fantasyTeamRule.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.fantasyTeamRule({ id: fantasyTeamRule.id })}
                    title={
                      'Show fantasyTeamRule ' + fantasyTeamRule.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editFantasyTeamRule({ id: fantasyTeamRule.id })}
                    title={'Edit fantasyTeamRule ' + fantasyTeamRule.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete fantasyTeamRule ' + fantasyTeamRule.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(fantasyTeamRule.id)}
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

export default FantasyTeamRulesList
