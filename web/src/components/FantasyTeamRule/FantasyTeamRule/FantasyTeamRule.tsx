import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import type {
  DeleteFantasyTeamRuleMutationVariables,
  FindFantasyTeamRuleById,
} from 'types/graphql'

const DELETE_FANTASY_TEAM_RULE_MUTATION = gql`
  mutation DeleteFantasyTeamRuleMutation($id: String!) {
    deleteFantasyTeamRule(id: $id) {
      id
    }
  }
`

interface Props {
  fantasyTeamRule: NonNullable<FindFantasyTeamRuleById['fantasyTeamRule']>
}

const FantasyTeamRule = ({ fantasyTeamRule }: Props) => {
  const [deleteFantasyTeamRule] = useMutation(
    DELETE_FANTASY_TEAM_RULE_MUTATION,
    {
      onCompleted: () => {
        toast.success('FantasyTeamRule deleted')
        navigate(routes.fantasyTeamRules())
      },
      onError: (error) => {
        toast.error(error.message)
      },
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
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            FantasyTeamRule {fantasyTeamRule.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{fantasyTeamRule.id}</td>
            </tr>
            <tr>
              <th>Pick number from</th>
              <td>{fantasyTeamRule.pickNumberFrom}</td>
            </tr>
            <tr>
              <th>Pick number to</th>
              <td>{fantasyTeamRule.pickNumberTo}</td>
            </tr>
            <tr>
              <th>Rank min</th>
              <td>{fantasyTeamRule.rankMin}</td>
            </tr>
            <tr>
              <th>Rank max</th>
              <td>{fantasyTeamRule.rankMax}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(fantasyTeamRule.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(fantasyTeamRule.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFantasyTeamRule({ id: fantasyTeamRule.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(fantasyTeamRule.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default FantasyTeamRule
