import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FantasyTeamForm from 'src/components/FantasyTeam/FantasyTeamForm'

import type { CreateFantasyTeamInput } from 'types/graphql'

const CREATE_FANTASY_TEAM_MUTATION = gql`
  mutation CreateFantasyTeamMutation($input: CreateFantasyTeamInput!) {
    createFantasyTeam(input: $input) {
      id
    }
  }
`

const NewFantasyTeam = () => {
  const [createFantasyTeam, { loading, error }] = useMutation(
    CREATE_FANTASY_TEAM_MUTATION,
    {
      onCompleted: () => {
        toast.success('FantasyTeam created')
        navigate(routes.fantasyTeams())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateFantasyTeamInput) => {
    createFantasyTeam({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New FantasyTeam</h2>
      </header>
      <div className="rw-segment-main">
        <FantasyTeamForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewFantasyTeam
