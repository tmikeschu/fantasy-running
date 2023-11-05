import { Box, Heading, Stack, StackDivider } from '@chakra-ui/react'
import type { EditEventById, UpdateEventInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EventForm from 'src/components/Event/EventForm'

export const QUERY = gql`
  query EditEventById($id: String!) {
    event: event(id: $id) {
      id
      name
      date
      location
      createdAt
      updatedAt
    }
  }
`
const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEventMutation($id: String!, $input: UpdateEventInput!) {
    updateEvent(id: $id, input: $input) {
      id
      name
      date
      location
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ event }: CellSuccessProps<EditEventById>) => {
  const [updateEvent, { loading, error }] = useMutation(UPDATE_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('Event updated')
      navigate(routes.events())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (
    input: UpdateEventInput,
    id: EditEventById['event']['id']
  ) => {
    updateEvent({ variables: { id, input } })
  }

  return (
    <Stack spacing="5" divider={<StackDivider />} maxW="7xl">
      <Stack direction="column" alignItems="flex-start">
        <Box as="section" pb={{ base: '2', md: '4' }}>
          <Stack spacing="1">
            <Heading size={{ base: 'sm', md: 'lg' }} fontWeight="medium">
              Edit event {event?.id}
            </Heading>
          </Stack>
        </Box>
        <EventForm
          event={event}
          onSave={onSave}
          error={error}
          isLoading={loading}
        />
      </Stack>
    </Stack>
  )
}
