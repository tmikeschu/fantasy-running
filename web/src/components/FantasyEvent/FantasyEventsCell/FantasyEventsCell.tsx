import {
  Button,
  Center,
  Skeleton,
  Text,
  TextProps,
  VStack,
  Wrap,
  WrapItem,
  WrapItemProps,
  forwardRef,
} from '@chakra-ui/react'
import type { FantasyEventsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EmptyResource from 'src/components/EmptyResource/EmptyResource'
import ErrorAlert from 'src/components/ErrorAlert/ErrorAlert'

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
}: CellSuccessProps<FantasyEventsQuery>) => {
  return (
    <Wrap w="full">
      {fantasyEvents.map((item) => {
        return (
          <Card key={item.id}>
            <VStack>
              <CardText>{item.event.name}</CardText>
              <Button as={Link} to={routes.newFantasyTeam({ id: item.id })}>
                Make a team
              </Button>
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
