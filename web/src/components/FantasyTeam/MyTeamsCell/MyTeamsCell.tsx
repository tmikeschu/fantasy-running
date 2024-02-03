import {
  Heading,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Skeleton,
  WrapItem,
  Wrap,
  Center,
  Button,
} from '@chakra-ui/react'
import { BiPencil } from 'react-icons/bi'
import type { MyTeamsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TeamMembers from 'src/components/TeamMembers/TeamMembers'

import EmptyResource from '../../EmptyResource/EmptyResource'
import ErrorAlert from '../../ErrorAlert/ErrorAlert'

export const QUERY = gql`
  query MyTeamsQuery($ownerId: String!) {
    fantasyTeams: myFantasyTeams(ownerId: $ownerId) {
      id
      name
      fantasyEvent {
        status

        event {
          name
        }
      }
      teamMembers {
        id
        pickNumber
        runner {
          seed

          runner {
            name
            genderDivision
          }
        }
      }
    }
  }
`

export const Loading = () => (
  <Accordion aria-label="loading">
    {Array.from({ length: 3 }, (_, i) => (
      <AccordionItem key={i}>
        <AccordionButton>
          <Skeleton w="full">
            <Heading fontSize="lg">...</Heading>
          </Skeleton>
        </AccordionButton>
      </AccordionItem>
    ))}
  </Accordion>
)

export const Empty = () => (
  <EmptyResource newPath={routes.fantasyEvents()}>teams</EmptyResource>
)

export const Failure = ({ error }: CellFailureProps) => (
  <ErrorAlert message={error?.message} />
)

export const Success = ({ fantasyTeams }: CellSuccessProps<MyTeamsQuery>) => {
  return (
    <VStack alignItems="stretch">
      <Accordion defaultIndex={[0]} allowMultiple>
        {fantasyTeams.map((fantasyTeam) => {
          return (
            <AccordionItem key={fantasyTeam.id}>
              <AccordionButton>
                <Heading fontSize="lg">
                  {fantasyTeam.fantasyEvent?.event.name}:{' '}
                  {fantasyTeam.name ?? '(unnamed)'}
                </Heading>
              </AccordionButton>
              <AccordionPanel boxShadow="sm">
                <Wrap spacingX="8" spacingY="4">
                  {Object.entries(
                    fantasyTeam.teamMembers.reduce((acc, runner) => {
                      const division =
                        runner?.runner.runner.genderDivision ?? 'other'
                      if (!acc[division]) acc[division] = []
                      acc[division].push(runner)
                      return acc
                    }, {} as Record<string, typeof fantasyTeam.teamMembers>)
                  ).map(([genderDivision, teamMembers]) => (
                    <WrapItem key={genderDivision}>
                      <TeamMembers
                        genderDivision={genderDivision}
                        teamMembers={teamMembers}
                      />
                    </WrapItem>
                  ))}
                  {fantasyTeam.fantasyEvent.status === 'LIVE' ? (
                    <WrapItem>
                      <Center h="full">
                        <Button
                          as={Link}
                          leftIcon={<BiPencil />}
                          to={routes.editFantasyTeam({ id: fantasyTeam.id })}
                        >
                          Edit
                        </Button>
                      </Center>
                    </WrapItem>
                  ) : null}
                </Wrap>
              </AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    </VStack>
  )
}
