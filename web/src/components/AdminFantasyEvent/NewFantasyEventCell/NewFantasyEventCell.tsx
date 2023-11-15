import { Box, Heading, Spinner } from '@chakra-ui/react'
import type { GetNewFantasyEventRelations } from 'types/graphql'
import type { CreateFantasyEventInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EmptyResource from 'src/components/EmptyResource/EmptyResource'
import ErrorAlert from 'src/components/ErrorAlert/ErrorAlert'
import FantasyEventForm from 'src/components/AdminFantasyEvent/FantasyEventForm'

export const QUERY = gql`
  query GetNewFantasyEventRelations {
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

const CREATE_FANTASY_EVENT_MUTATION = gql`
  mutation CreateFantasyEventMutation($input: CreateFantasyEventInput!) {
    createFantasyEvent(input: $input) {
      id
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => (
  <EmptyResource newPath={routes.newEvent()}>events</EmptyResource>
)

export const Failure = ({ error }: CellFailureProps) => (
  <ErrorAlert message={error.message} />
)

export const Success = ({
  events,
  fantasyTeamRules,
}: CellSuccessProps<GetNewFantasyEventRelations>) => {
  const [createFantasyEvent, { loading, error }] = useMutation<
    unknown,
    {
      input: CreateFantasyEventInput
    }
  >(CREATE_FANTASY_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('FantasyEvent created')
      navigate(routes.adminFantasyEvents())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateFantasyEventInput) => {
    createFantasyEvent({ variables: { input } })
  }

  return (
    <Box>
      <Box as="header">
        <Heading as="h2" className="rw-heading rw-heading-secondary">
          New Fantasy Event
        </Heading>
      </Box>
      <Box py="8">
        <FantasyEventForm
          onSave={onSave}
          loading={loading}
          error={error}
          events={events}
          fantasyTeamRules={fantasyTeamRules}
        />
      </Box>
    </Box>
  )
}
