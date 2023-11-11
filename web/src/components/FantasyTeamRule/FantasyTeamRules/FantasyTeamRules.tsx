import { Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import type {
  DeleteFantasyTeamRuleMutationVariables,
  FindFantasyTeamRules,
} from 'types/graphql'

import { routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AdminTableCrudAction from 'src/components/AdminTableCrudAction/AdminTableCrudAction'
import AdminTableWrapper, {
  AdminTableCreateResourceButton,
  AdminTableHeader,
} from 'src/components/AdminTableWrapper/AdminTableWrapper'
import { QUERY } from 'src/components/FantasyTeamRule/FantasyTeamRulesCell'
import { truncate } from 'src/lib/formatters'

const DELETE_FANTASY_TEAM_RULE_MUTATION = gql`
  mutation DeleteFantasyTeamRuleMutation($id: String!) {
    deleteFantasyTeamRule(id: $id) {
      id
    }
  }
`

const FantasyTeamRulesList = ({ fantasyTeamRules }: FindFantasyTeamRules) => {
  const [deleteFantasyTeamRule] = useMutation(
    DELETE_FANTASY_TEAM_RULE_MUTATION,
    {
      onCompleted: () => {
        toast.success('FantasyTeamRule deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (id: DeleteFantasyTeamRuleMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete fantasyTeamRule ' + id + '?')
    ) {
      deleteFantasyTeamRule({ variables: { id } })
    }
  }

  return (
    <AdminTableWrapper
      newPath={routes.newFantasyTeamRule()}
      resource="fantasy team rule"
      header={
        <>
          <AdminTableHeader>Fantasy Team Rules</AdminTableHeader>
          <AdminTableCreateResourceButton />
        </>
      }
    >
      <Table>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>From seed</Th>
            <Th>To seed</Th>
            <Th>Rank min</Th>
            <Th>Rank max</Th>
            <Th>&nbsp;</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fantasyTeamRules.map(
            ({ id, pickNumberFrom, pickNumberTo, rankMax, rankMin }) => (
              <Tr key={id}>
                <Td>
                  <Text fontSize="sm" color="gray.500">
                    {truncate(id)}
                  </Text>
                </Td>
                <Td>{truncate(pickNumberFrom)}</Td>
                <Td>{truncate(pickNumberTo)}</Td>
                <Td>{truncate(rankMin)}</Td>
                <Td>{truncate(rankMax)}</Td>
                <Td>
                  <AdminTableCrudAction.Wrapper id={id}>
                    <AdminTableCrudAction.Show
                      to={routes.fantasyTeamRule({ id })}
                    />
                    <AdminTableCrudAction.Edit
                      to={routes.editFantasyTeamRule({ id })}
                    />
                    <AdminTableCrudAction.Delete
                      onClick={(id) => onDeleteClick(id)}
                    />
                  </AdminTableCrudAction.Wrapper>
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </AdminTableWrapper>
  )
}

export default FantasyTeamRulesList
