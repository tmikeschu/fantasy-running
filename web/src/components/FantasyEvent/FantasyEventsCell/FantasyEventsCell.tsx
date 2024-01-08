import {
  Button,
  Center,
  HStack,
  Skeleton,
  Text,
  TextProps,
  VStack,
  Wrap,
  WrapItem,
  WrapItemProps,
  forwardRef,
} from '@chakra-ui/react'
import { match } from 'ts-pattern'
import type { FantasyEventsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import EmptyResource from 'src/components/EmptyResource/EmptyResource'
import ErrorAlert from 'src/components/ErrorAlert/ErrorAlert'

export const QUERY = gql`
  query FantasyEventsQuery($ownerId: String!) {
    fantasyEvents {
      id
      status
      name
      teamCount
      event {
        name
      }
    }

    myFantasyTeams(ownerId: $ownerId) {
      fantasyEvent {
        id
      }
    }
  }
`

export const Loading = () => (
  <Wrap aria-label="loading">
    {Array.from({ length: 3 }, (_, i) => (
      <Card key={i}>
        <VStack>
          <Skeleton>
            <CardText>Some loading event</CardText>
          </Skeleton>
          <Skeleton>
            <Button>loading</Button>
          </Skeleton>
        </VStack>
      </Card>
    ))}
  </Wrap>
)

export const Empty = () => <EmptyResource>events</EmptyResource>

export const Failure = ({ error }: CellFailureProps) => (
  <ErrorAlert message={error?.message} />
)

export const Success = ({
  fantasyEvents,
  myFantasyTeams,
}: CellSuccessProps<FantasyEventsQuery>) => {
  const eventTeamMap = myFantasyTeams.reduce((acc, t) => {
    if (!acc[t.fantasyEvent.id]) {
      acc[t.fantasyEvent.id] = []
    }
    acc[t.fantasyEvent.id].push(t)
    return acc
  }, {} as Record<string, typeof myFantasyTeams>)

  const { hasRole } = useAuth()
  const isAdmin = hasRole('ADMIN')
  return (
    <Wrap w="full">
      {fantasyEvents.map((item) => {
        const canMakeTeam =
          (eventTeamMap[item.id]?.length ?? 0) < item.teamCount
        return (
          <Card key={item.id}>
            <VStack>
              <CardText>{item.name ?? item.event.name}</CardText>
              {match({ canMakeTeam, status: item.status, isAdmin })
                .with({ canMakeTeam: false }, () => (
                  <Button as={Link} to={routes.myTeams()}>
                    {item.teamCount > 1 ? 'View teams' : 'View team'}
                  </Button>
                ))
                .with({ isAdmin: true }, () => (
                  <HStack>
                    <Button as={Link} to={routes.myTeams()}>
                      {item.teamCount > 1 ? 'View teams' : 'View team'}
                    </Button>
                    <Button
                      as={Link}
                      to={routes.newFantasyTeam({ id: item.id })}
                    >
                      Make a team
                    </Button>
                  </HStack>
                ))
                .with({ status: 'LIVE' }, () => (
                  <Button as={Link} to={routes.newFantasyTeam({ id: item.id })}>
                    Make a team
                  </Button>
                ))
                .otherwise(() => (
                  <Button isDisabled>Coming soon</Button>
                ))}
            </VStack>
          </Card>
        )
      })}
    </Wrap>
  )
}

const CardText = forwardRef<TextProps, 'p'>((props, ref) => (
  <Text
    {...{
      ref,
      as: 'h3',
      fontSize: '2xl',
      fontWeight: 'bold',
      color: 'gray.700',
      ...props,
    }}
  />
))

const Card = forwardRef<WrapItemProps, 'li'>((props, ref) => (
  <Center
    {...{
      ref,
      borderRadius: 'base',
      as: WrapItem,
      boxShadow: 'base',
      w: { base: 'full', md: 'xs' },
      h: 'xs',
      alignItems: 'center',
      ...props,
    }}
  />
))
