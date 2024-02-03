import {
  Box,
  Center,
  Heading,
  Image,
  List,
  ListItem,
  VStack,
} from '@chakra-ui/react'
import Markdown from 'react-markdown'
import type {
  CreateFantasyTeamInput,
  FindNewFantasyTeamQuery,
  FindNewFantasyTeamQueryVariables,
  FantasyTeamMemberInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

import NewFantasyTeamForm from '../FantasyTeamForm/FantasyTeamForm'

export const QUERY = gql`
  query FindNewFantasyTeamQuery($id: String!) {
    fantasyEvent: fantasyEvent(id: $id) {
      id
      teamSize
      description
      name
      status

      rules {
        pickNumberFrom
        pickNumberTo
        rankMin
        rankMax
      }

      prizes {
        id
        name
        description
        blobs {
          id
          name
          url
        }
      }

      event {
        id
        name
        eventRunners {
          id
          seed

          runner {
            genderDivision
            name
          }
        }
      }
    }
  }
`

const CREATE_FANTASY_TEAM_MUTATION = gql`
  mutation CreateFantasyTeamMutation(
    $input: CreateFantasyTeamInput!
    $members: [FantasyTeamMemberInput!]!
  ) {
    createFantasyTeam(input: $input, members: $members) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindNewFantasyTeamQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  fantasyEvent,
}: CellSuccessProps<
  FindNewFantasyTeamQuery,
  FindNewFantasyTeamQueryVariables
>) => {
  if (fantasyEvent.status === 'COMPLETE') {
    navigate(routes.myTeams())
  }

  const [createFantasyTeam, { loading, error }] = useMutation(
    CREATE_FANTASY_TEAM_MUTATION,
    {
      onCompleted: () => {
        toast.success('EventRunner updated')
        navigate(routes.myTeams())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const { currentUser } = useAuth<{ assertUser: true }>()

  const onSave = ({
    input,
    members,
  }: {
    id?: string
    input: CreateFantasyTeamInput
    members: FantasyTeamMemberInput[]
  }) => {
    createFantasyTeam({ variables: { input, members } })
  }

  return (
    <>
      <Heading as="h1">{fantasyEvent.name ?? fantasyEvent.event.name}</Heading>
      <VStack alignItems="flex-start" overflow="auto" h="full">
        <List
          spacing="4"
          w="full"
          overflowX="auto"
          display="flex"
          gap="4"
          py="1"
          px="1"
        >
          {fantasyEvent.prizes.map((prize) => (
            <ListItem
              key={prize.id}
              mt="0!important"
              boxShadow="base"
              w="48"
              p="2"
            >
              <Center h="full">
                <Image src={prize.blobs[0].url} />
              </Center>
            </ListItem>
          ))}
        </List>

        <Box
          as={Markdown}
          fontSize={{ base: 'md', md: 'sm' }}
          color="gray.600"
          mb="8"
          sx={{
            a: {
              color: 'blue.500',
              textDecor: 'underline',
            },
          }}
        >
          {fantasyEvent.description}
        </Box>

        <NewFantasyTeamForm
          {...{
            currentUser,
            fantasyEvent,
            onSave,
            error,
            loading,
          }}
        />
      </VStack>
    </>
  )
}
