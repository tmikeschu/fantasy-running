import { Button, Center, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import type { FantasyEventsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FantasyEventsQuery {
    fantasyEvents {
      id
      event {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  fantasyEvents,
}: CellSuccessProps<FantasyEventsQuery>) => {
  return (
    <Wrap>
      {fantasyEvents.map((item) => {
        return (
          <WrapItem
            borderRadius="base"
            as={Center}
            key={item.id}
            boxShadow="base"
            w="xs"
            h="xs"
            alignItems="center"
          >
            <VStack>
              <Text fontSize="2xl" fontWeight="bold" color="gray.700">
                {item.event.name}
              </Text>
              <Button as={Link} to={routes.newFantasyTeam({ id: item.id })}>
                Make a team
              </Button>
            </VStack>
          </WrapItem>
        )
      })}
    </Wrap>
  )
}
