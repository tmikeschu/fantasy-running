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
} from '@chakra-ui/react'
import type { MyTeamsQuery } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TeamMembers from 'src/components/TeamMembers/TeamMembers'

import EmptyResource from '../../EmptyResource/EmptyResource'
import ErrorAlert from '../../ErrorAlert/ErrorAlert'

export const QUERY = gql`
  query MyTeamsQuery($ownerId: String!) {
    fantasyTeams: myFantasyTeams(ownerId: $ownerId) {
      id
      wager {
        venmoHandle
      }
      fantasyEvent {
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
        {fantasyTeams.map((item) => {
          return (
            <AccordionItem key={item.id}>
              <AccordionButton>
                <Heading fontSize="lg">{item.fantasyEvent?.event.name}</Heading>
              </AccordionButton>
              <AccordionPanel boxShadow="sm">
                <Wrap spacingX="8" spacingY="4">
                  {Object.entries(
                    item.teamMembers.reduce((acc, runner) => {
                      const division =
                        runner?.runner.runner.genderDivision ?? 'other'
                      if (!acc[division]) acc[division] = []
                      acc[division].push(runner)
                      return acc
                    }, {} as Record<string, typeof item.teamMembers>)
                  ).map(([genderDivision, teamMembers]) => (
                    <WrapItem key={genderDivision}>
                      <TeamMembers
                        genderDivision={genderDivision}
                        teamMembers={teamMembers}
                      />
                    </WrapItem>
                  ))}
                </Wrap>
              </AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    </VStack>
  )
}
