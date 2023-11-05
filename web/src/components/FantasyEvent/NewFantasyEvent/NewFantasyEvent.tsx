import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FantasyEventForm from 'src/components/FantasyEvent/FantasyEventForm'

import type { CreateFantasyEventInput } from 'types/graphql'

const CREATE_FANTASY_EVENT_MUTATION = gql`
  mutation CreateFantasyEventMutation($input: CreateFantasyEventInput!) {
    createFantasyEvent(input: $input) {
      id
    }
  }
`

const NewFantasyEvent = () => {
  const [createFantasyEvent, { loading, error }] = useMutation(
    CREATE_FANTASY_EVENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('FantasyEvent created')
        navigate(routes.fantasyEvents())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateFantasyEventInput) => {
    createFantasyEvent({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New FantasyEvent</h2>
      </header>
      <div className="rw-segment-main">
        <FantasyEventForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewFantasyEvent
