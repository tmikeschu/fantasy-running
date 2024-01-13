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
  EditFantasyTeamQuery,
  EditFantasyTeamQueryVariables,
  FantasyTeamMemberInput,
  UpdateFantasyTeamInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

import FantasyTeamForm from '../FantasyTeamForm/FantasyTeamForm'

export const QUERY = gql`
  query EditFantasyTeamQuery($id: String!) {
    fantasyTeam: fantasyTeam(id: $id) {
      id
      userId
      name

      teamMembers {
        id
        pickNumber
        runner {
          id
          seed

          runner {
            id
            name
            genderDivision
          }
        }
      }

      fantasyEvent {
        id
        teamSize
        description
        name

        event {
          name
        }

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
  }
`

const UPDATE_FANTASY_TEAM_MUTATION = gql`
  mutation UpdateFantasyTeamMutation(
    $id: String!
    $input: UpdateFantasyTeamInput!
    $members: [FantasyTeamMemberInput!]!
  ) {
    updateFantasyTeam(id: $id, input: $input, members: $members) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<EditFantasyTeamQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  fantasyTeam,
}: CellSuccessProps<EditFantasyTeamQuery, EditFantasyTeamQueryVariables>) => {
  const [updateFantasyTeam, { loading, error }] = useMutation(
    UPDATE_FANTASY_TEAM_MUTATION,
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
  if (currentUser.id !== fantasyTeam.userId) {
    navigate(routes.myTeams())
  }

  const onSave = ({
    id,
    input,
    members,
  }: {
    id?: string
    input: UpdateFantasyTeamInput
    members: FantasyTeamMemberInput[]
  }) => {
    updateFantasyTeam({ variables: { id, input, members } })
  }

  const { fantasyEvent } = fantasyTeam

  return (
    <>
      <Heading as="h1">{fantasyEvent.name || fantasyEvent.event.name}</Heading>
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

        <FantasyTeamForm
          {...{
            fantasyTeam,
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
