import type {
  EditFantasyEventById,
  UpdateFantasyEventInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FantasyEventForm from 'src/components/Admin/FantasyEvent/FantasyEventForm'

export const QUERY = gql`
  query EditFantasyEventById($id: String!) {
    fantasyEvent: fantasyEvent(id: $id) {
      id
      eventId
      teamSize
      createdAt
      updatedAt
      description
      rules {
        id
      }
    }
    events {
      id
      name
    }
    fantasyTeamRules {
      id
      pickNumberFrom
      pickNumberTo
      rankMin
      rankMax
    }
  }
`
const UPDATE_FANTASY_EVENT_MUTATION = gql`
  mutation UpdateFantasyEventMutation(
    $id: String!
    $input: UpdateFantasyEventInput!
  ) {
    updateFantasyEvent(id: $id, input: $input) {
      id
      eventId
      teamSize
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
  fantasyEvent,
  events,
  fantasyTeamRules,
}: CellSuccessProps<EditFantasyEventById>) => {
  const [updateFantasyEvent, { loading, error }] = useMutation(
    UPDATE_FANTASY_EVENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('FantasyEvent updated')
        navigate(routes.adminFantasyEvents())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateFantasyEventInput,
    id?: NonNullable<EditFantasyEventById['fantasyEvent']>['id']
  ) => {
    updateFantasyEvent({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit FantasyEvent {fantasyEvent?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <FantasyEventForm
          fantasyEvent={fantasyEvent}
          onSave={onSave}
          error={error}
          loading={loading}
          events={events}
          fantasyTeamRules={fantasyTeamRules}
        />
      </div>
    </div>
  )
}
