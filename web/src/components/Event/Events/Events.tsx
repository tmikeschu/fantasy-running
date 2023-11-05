import {
  Stack,
  Box,
  HStack,
  IconButton,
  Container,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { BiEditAlt, BiPlus, BiSolidBullseye, BiTrashAlt } from 'react-icons/bi'
import type { DeleteEventMutationVariables, FindEvents } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Event/EventsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEventMutation($id: String!) {
    deleteEvent(id: $id) {
      id
    }
  }
`

const EventsList = ({ events }: FindEvents) => {
  const [deleteEvent] = useMutation(DELETE_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('Event deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteEventMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete event ' + id + '?')) {
      deleteEvent({ variables: { id } })
    }
  }

  return (
    <Container py={{ base: '4', md: '8' }} px={{ base: '0', md: 8 }} maxW="7xl">
      <Box
        bg="bg.surface"
        boxShadow={{ base: 'none', md: 'sm' }}
        borderRadius={{ base: 'none', md: 'lg' }}
      >
        <Stack spacing="5">
          <Box px={{ base: '4', md: '6' }} pt="5">
            <Stack
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
            >
              <Text textStyle="lg" fontWeight="medium">
                Members
              </Text>
              <IconButton
                icon={<BiPlus />}
                aria-label="create event"
                variant="solid"
                colorScheme="blue"
                as={Link}
                to={routes.newEvent()}
              />
            </Stack>
          </Box>
          <Box overflowX="auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>Name (id)</Th>
                  <Th>Date</Th>
                  <Th>Location</Th>
                  <Th>Created at</Th>
                  <Th>Updated at</Th>
                  <Th>&nbsp;</Th>
                </Tr>
              </Thead>
              <Tbody>
                {events.map((event) => (
                  <Tr key={event.id}>
                    <Td>
                      <VStack alignItems="flex-start" spacing="0">
                        <Text fontWeight="medium">{truncate(event.name)}</Text>
                        <Text color="gray.400">{event.id}</Text>
                      </VStack>
                    </Td>
                    <Td>
                      <Text color="gray.500">{timeTag(event.date)}</Text>
                    </Td>
                    <Td>{truncate(event.location)}</Td>
                    <Td>{timeTag(event.createdAt)}</Td>
                    <Td>{timeTag(event.updatedAt)}</Td>
                    <Td>
                      <HStack spacing="px">
                        <IconButton
                          as={Link}
                          color="gray.600"
                          icon={<BiSolidBullseye />}
                          variant="ghost"
                          aria-label="View event"
                          to={routes.event({ id: event.id })}
                          title={'Show event ' + event.id + ' detail'}
                        />
                        <IconButton
                          as={Link}
                          color="gray.600"
                          icon={<BiEditAlt />}
                          variant="ghost"
                          aria-label="Edit event"
                          to={routes.editEvent({ id: event.id })}
                          title={'Edit event ' + event.id}
                        />
                        <IconButton
                          color="red.500"
                          as={Link}
                          icon={<BiTrashAlt />}
                          variant="ghost"
                          aria-label="Delete event"
                          title={'Delete event ' + event.id}
                          onClick={() => onDeleteClick(event.id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}

export default EventsList
