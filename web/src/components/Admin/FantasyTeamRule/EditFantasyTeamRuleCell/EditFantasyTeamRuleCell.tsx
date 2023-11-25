import type {
  EditFantasyTeamRuleById,
  UpdateFantasyTeamRuleInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FantasyTeamRuleForm from 'src/components/Admin/FantasyTeamRule/FantasyTeamRuleForm'

export const QUERY = gql`
  query EditFantasyTeamRuleById($id: String!) {
    fantasyTeamRule: fantasyTeamRule(id: $id) {
      id
      pickNumberFrom
      pickNumberTo
      rankMin
      rankMax
      createdAt
      updatedAt
    }
  }
`
const UPDATE_FANTASY_TEAM_RULE_MUTATION = gql`
  mutation UpdateFantasyTeamRuleMutation(
    $id: String!
    $input: UpdateFantasyTeamRuleInput!
  ) {
    updateFantasyTeamRule(id: $id, input: $input) {
      id
      pickNumberFrom
      pickNumberTo
      rankMin
      rankMax
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
  fantasyTeamRule,
}: CellSuccessProps<EditFantasyTeamRuleById>) => {
  const [updateFantasyTeamRule, { loading, error }] = useMutation(
    UPDATE_FANTASY_TEAM_RULE_MUTATION,
    {
      onCompleted: () => {
        toast.success('FantasyTeamRule updated')
        navigate(routes.fantasyTeamRules())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateFantasyTeamRuleInput,
    id?: NonNullable<EditFantasyTeamRuleById['fantasyTeamRule']>['id']
  ) => {
    updateFantasyTeamRule({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit FantasyTeamRule {fantasyTeamRule?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <FantasyTeamRuleForm
          fantasyTeamRule={fantasyTeamRule}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
