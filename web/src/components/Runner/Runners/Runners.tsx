import {
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import type { DeleteRunnerMutationVariables, FindRunners } from 'types/graphql'
import { useDebounce } from 'usehooks-ts'

import { routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AdminTableCrudAction from 'src/components/AdminTableCrudAction/AdminTableCrudAction'
import AdminTableWrapper, {
  AdminTableCreateResourceButton,
  AdminTableHeader,
} from 'src/components/AdminTableWrapper/AdminTableWrapper'
import { QUERY } from 'src/components/Runner/RunnersCell'
import { truncate } from 'src/lib/formatters'

const DELETE_RUNNER_MUTATION = gql`
  mutation DeleteRunnerMutation($id: String!) {
    deleteRunner(id: $id) {
      id
    }
  }
`

const RunnersList = ({ runners }: FindRunners) => {
  const [deleteRunner] = useMutation(DELETE_RUNNER_MUTATION, {
    onCompleted: () => {
      toast.success('Runner deleted')
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

  const onDeleteClick = (id: DeleteRunnerMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete runner ' + id + '?')) {
      deleteRunner({ variables: { id } })
    }
  }

  const [searchQuery, setSearchQuery] = React.useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const filteredRunners = React.useMemo(() => {
    return runners.filter((r) =>
      r.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    )
  }, [debouncedSearchQuery, runners])

  return (
    <AdminTableWrapper
      header={
        <>
          <AdminTableHeader>
            Runners ({filteredRunners.length} of {runners.length})
          </AdminTableHeader>
          <HStack>
            <InputGroup>
              <InputLeftElement>
                <BiSearch />
              </InputLeftElement>
              <Input
                placeholder="Search by name"
                onChange={(e) => {
                  setSearchQuery(e.currentTarget.value)
                }}
              />
            </InputGroup>
            <AdminTableCreateResourceButton />
          </HStack>
        </>
      }
      newPath={routes.newRunner()}
      resource="runner"
    >
      <Table className="rw-table">
        <Thead>
          <Tr>
            <Th>Name (id)</Th>
            <Th>Id</Th>
            <Th>&nbsp;</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredRunners.map((runner) => (
            <Tr key={runner.id}>
              <Td>
                <Text fontWeight="bold">{truncate(runner.name)}</Text>
              </Td>
              <Td>
                <Text fontSize="sm" color="gray.500">
                  {truncate(runner.id)}
                </Text>
              </Td>
              <Td>
                <AdminTableCrudAction.Wrapper id={runner.id}>
                  <AdminTableCrudAction.Show
                    to={routes.runner({ id: runner.id })}
                  />
                  <AdminTableCrudAction.Edit
                    to={routes.editRunner({ id: runner.id })}
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

export default RunnersList
