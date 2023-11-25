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
import type { FindRunners } from 'types/graphql'
import { useDebounce } from 'usehooks-ts'

import AdminTableWrapper, {
  AdminTableCreateResourceButton,
  AdminTableHeader,
} from 'src/components/AdminTableWrapper/AdminTableWrapper'
import { truncate } from 'src/lib/formatters'

const RunnersList = ({ runners }: FindRunners) => {
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
      resource="runner"
    >
      <Table className="rw-table">
        <Thead>
          <Tr>
            <Th>Name (id)</Th>
            <Th>Id</Th>
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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </AdminTableWrapper>
  )
}

export default RunnersList
