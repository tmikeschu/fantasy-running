import { Table, Thead, Th, Tr, Tbody, Td } from '@chakra-ui/react'
import type { FindFantasyTeams } from 'types/graphql'

import { truncate } from 'src/lib/formatters'

import AdminTableWrapper, {
  AdminTableHeader,
} from '../../AdminTableWrapper/AdminTableWrapper'

const AdminFantasyTeamsList = ({ fantasyTeams }: FindFantasyTeams) => {
  return (
    <AdminTableWrapper
      resource="fantasy teams"
      header={
        <>
          <AdminTableHeader>Fantasy Teams</AdminTableHeader>
        </>
      }
    >
      <Table className="rw-table">
        <Thead>
          <Tr>
            <Th>Owner</Th>
            <Th>Fantasy event</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fantasyTeams.map((fantasyTeam) => (
            <Tr key={fantasyTeam.id}>
              <Td>
                {truncate(
                  fantasyTeam.owner.name ?? fantasyTeam.owner.email ?? 'unknown'
                )}
              </Td>
              <Td>{truncate(fantasyTeam.fantasyEvent.event.name)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </AdminTableWrapper>
  )
}

export default AdminFantasyTeamsList
