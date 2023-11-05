import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FantasyTeamRuleForm from 'src/components/FantasyTeamRule/FantasyTeamRuleForm'

import type { CreateFantasyTeamRuleInput } from 'types/graphql'

const CREATE_FANTASY_TEAM_RULE_MUTATION = gql`
  mutation CreateFantasyTeamRuleMutation($input: CreateFantasyTeamRuleInput!) {
    createFantasyTeamRule(input: $input) {
      id
    }
  }
`

const NewFantasyTeamRule = () => {
  const [createFantasyTeamRule, { loading, error }] = useMutation(
    CREATE_FANTASY_TEAM_RULE_MUTATION,
    {
      onCompleted: () => {
        toast.success('FantasyTeamRule created')
        navigate(routes.fantasyTeamRules())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateFantasyTeamRuleInput) => {
    createFantasyTeamRule({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New FantasyTeamRule</h2>
      </header>
      <div className="rw-segment-main">
        <FantasyTeamRuleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewFantasyTeamRule
