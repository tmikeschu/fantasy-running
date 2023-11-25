import {
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

import AdminTableWrapper from '../Admin/AdminTableWrapper/AdminTableWrapper'

type LoadingTableProps = {
  header: React.ReactNode
}

const LoadingTable = (props: LoadingTableProps) => {
  return (
    <AdminTableWrapper
      resource="LoadingTable"
      newPath="#"
      isDisabled
      header={props.header}
    >
      <Table>
        <Thead>
          <Tr>
            <Th>
              <Skeleton>
                <Text>Loading</Text>
              </Skeleton>
            </Th>
            <Th>
              <Skeleton>
                <Text>Loading</Text>
              </Skeleton>
            </Th>
            <Th>
              <Skeleton>
                <Text>Loading</Text>
              </Skeleton>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.from({ length: 10 }).map((_, i) => (
            <Tr key={i}>
              <Td>
                <Skeleton>
                  <Text>Loading</Text>
                </Skeleton>
              </Td>
              <Td>
                <Skeleton>
                  <Text>Loading</Text>
                </Skeleton>
              </Td>
              <Td>
                <Skeleton>
                  <Text>Loading</Text>
                </Skeleton>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </AdminTableWrapper>
  )
}

export default LoadingTable
