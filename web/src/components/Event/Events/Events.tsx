import { Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import type { DeleteEventMutationVariables, FindEvents } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AdminTableCrudAction from 'src/components/AdminTableCrudAction/AdminTableCrudAction'
import AdminTableWrapper, {
  AdminTableCreateResourceButton,
  AdminTableHeader,
} from 'src/components/AdminTableWrapper/AdminTableWrapper'
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
    <AdminTableWrapper
      header={
        <>
          <AdminTableHeader>Events</AdminTableHeader>
          <AdminTableCreateResourceButton />
        </>
      }
      newPath={routes.newEvent()}
      resource="event"
    >
      <Table>
        <Thead>
          <Tr>
            <Th>Name (id)</Th>
            <Th>Date</Th>
            <Th>Location</Th>
            <Th>&nbsp;</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map((event) => (
            <Tr key={event.id}>
              <Td>
                <VStack alignItems="flex-start" spacing="0">
                  <Text fontWeight="medium">{truncate(event.name)}</Text>
                  <Text fontSize="sm" color="gray.400">
                    {event.id}
                  </Text>
                </VStack>
              </Td>
              <Td>
                <Text color="gray.500">{timeTag(event.date)}</Text>
              </Td>
              <Td>{truncate(event.location)}</Td>
              <Td>
                <AdminTableCrudAction.Wrapper id={event.id}>
                  <AdminTableCrudAction.Edit
                    to={routes.editEvent({ id: event.id })}
                  />
                  <AdminTableCrudAction.Delete
                    onClick={(id) => onDeleteClick(id)}
                  />
                </AdminTableCrudAction.Wrapper>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </AdminTableWrapper>
  )
}

export default EventsList
