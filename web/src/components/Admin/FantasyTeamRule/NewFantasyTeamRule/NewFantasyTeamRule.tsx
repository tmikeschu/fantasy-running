import { Box, Heading } from '@chakra-ui/react'
import type { CreateFantasyTeamRuleInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FantasyTeamRuleForm from 'src/components/Admin/FantasyTeamRule/FantasyTeamRuleForm'

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
    <Box>
      <Box as="header">
        <Heading as="h2">New Fantasy Team Rule</Heading>
      </Box>
      <Box py="8">
        <FantasyTeamRuleForm onSave={onSave} loading={loading} error={error} />
      </Box>
    </Box>
  )
}

export default NewFantasyTeamRule
