import type {
  EditFantasyTeamById,
  UpdateFantasyTeamInput,
  FantasyTeamMemberInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FantasyTeamForm from 'src/components/FantasyTeam/FantasyTeamForm'

export const QUERY = gql`
  query EditFantasyTeamById($id: String!) {
    fantasyTeam: fantasyTeam(id: $id) {
      id
      name
      userId
      fantasyEventId
      fantasyTeamWagerId
      createdAt
      updatedAt
    }
  }
`
const UPDATE_FANTASY_TEAM_MUTATION = gql`
  mutation UpdateFantasyTeamMutation(
    $id: String!
    $input: UpdateFantasyTeamInput!
    $members: [FantasyTeamMemberInput!]!
  ) {
    updateFantasyTeam(id: $id, input: $input, members: $members) {
      id
      name
      userId
      fantasyEventId
      fantasyTeamWagerId
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
  fantasyTeam,
}: CellSuccessProps<EditFantasyTeamById>) => {
  const [updateFantasyTeam, { loading, error }] = useMutation(
    UPDATE_FANTASY_TEAM_MUTATION,
    {
      onCompleted: () => {
        toast.success('FantasyTeam updated')
        navigate(routes.fantasyTeams())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateFantasyTeamInput,
    id: EditFantasyTeamById['fantasyTeam']['id']
  ) => {
    updateFantasyTeam({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit FantasyTeam {fantasyTeam?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <FantasyTeamForm
          fantasyTeam={fantasyTeam}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
