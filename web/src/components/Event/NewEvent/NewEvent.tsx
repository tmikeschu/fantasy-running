import { Box, Stack, StackDivider, Heading } from '@chakra-ui/react'
import type { CreateEventInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EventForm from 'src/components/Event/EventForm'

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEventMutation($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
    }
  }
`

const NewEvent = () => {
  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('Event created')
      navigate(routes.events())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateEventInput) => {
    createEvent({ variables: { input } })
  }

  return (
    <Stack spacing="5" divider={<StackDivider />} maxW="7xl">
      <Stack direction="column" alignItems="flex-start">
        <Box as="section" pb={{ base: '2', md: '4' }}>
          <Stack spacing="1">
            <Heading size={{ base: 'sm', md: 'lg' }} fontWeight="medium">
              New event
            </Heading>
          </Stack>
        </Box>
        <EventForm onSave={onSave} isLoading={loading} error={error} />
      </Stack>
    </Stack>
  )
}

export default NewEvent
