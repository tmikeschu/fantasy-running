import { Table, Th, Thead, Tbody, Tr, Td } from '@chakra-ui/react'
import type {
  DeleteFantasyEventMutationVariables,
  FindFantasyEvents,
} from 'types/graphql'

import { routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AdminTableCrudAction from 'src/components/AdminTableCrudAction/AdminTableCrudAction'
import AdminTableWrapper, {
  AdminTableCreateResourceButton,
  AdminTableHeader,
} from 'src/components/AdminTableWrapper/AdminTableWrapper'
import { QUERY } from 'src/components/FantasyEvent/FantasyEventsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_FANTASY_EVENT_MUTATION = gql`
  mutation DeleteFantasyEventMutation($id: String!) {
    deleteFantasyEvent(id: $id) {
      id
    }
  }
`

const FantasyEventsList = ({ fantasyEvents }: FindFantasyEvents) => {
  const [deleteFantasyEvent] = useMutation(DELETE_FANTASY_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('FantasyEvent deleted')
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

  const onDeleteClick = (id: DeleteFantasyEventMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete fantasyEvent ' + id + '?')) {
      deleteFantasyEvent({ variables: { id } })
    }
  }

  return (
    <AdminTableWrapper
      resource="fantasy event"
      newPath={routes.newFantasyEvent()}
      header={
        <>
          <AdminTableHeader>Fantasy Events</AdminTableHeader>
          <AdminTableCreateResourceButton />
        </>
      }
    >
      <Table className="rw-table">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Event id</Th>
            <Th>Team size</Th>
            <Th>Created at</Th>
            <Th>Updated at</Th>
            <Th>&nbsp;</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fantasyEvents.map((fantasyEvent) => (
            <Tr key={fantasyEvent.id}>
              <Td>{truncate(fantasyEvent.id)}</Td>
              <Td>{truncate(fantasyEvent.eventId)}</Td>
              <Td>{truncate(fantasyEvent.teamSize)}</Td>
              <Td>{timeTag(fantasyEvent.createdAt)}</Td>
              <Td>{timeTag(fantasyEvent.updatedAt)}</Td>
              <Td>
                <AdminTableCrudAction.Wrapper id={fantasyEvent.id}>
                  <AdminTableCrudAction.Show
                    to={routes.fantasyEvent({ id: fantasyEvent.id })}
                  />
                  <AdminTableCrudAction.Edit
                    to={routes.editFantasyEvent({ id: fantasyEvent.id })}
                  />
                  <AdminTableCrudAction.Delete
                    onClick={() => onDeleteClick(fantasyEvent.id)}
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

export default FantasyEventsList
