import { Box } from '@chakra-ui/react'
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

import NewFantasyTeamForm from '../NewFantasyTeamForm/NewFantasyTeamForm'

export const QUERY = gql`
  query FindNewFantasyTeamQuery($id: String!) {
    fantasyEvent: fantasyEvent(id: $id) {
      id
      teamSize
      description
      rules {
        pickNumberFrom
        pickNumberTo
        rankMin
        rankMax
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
    input: CreateFantasyTeamInput
    members: FantasyTeamMemberInput[]
  }) => {
    createFantasyTeam({ variables: { input, members } })
  }

  return (
    <Box overflow="auto" h="full">
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
    </Box>
  )
}