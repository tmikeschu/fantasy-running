import {
  Heading,
  List,
  ListItem,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  HStack,
  Text,
  Skeleton,
  WrapItem,
  Wrap,
} from '@chakra-ui/react'
import type { MyTeamsQuery } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { capitalize } from '../../../lib/formatters'
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
  <Accordion allowToggle aria-label="loading">
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
      <Accordion allowToggle>
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
                  ).map(([genderDivision, picks]) => (
                    <WrapItem key={genderDivision}>
                      <VStack alignItems="flex-start" spacing="4">
                        <Heading fontSize="lg">
                          {capitalize(genderDivision)}
                        </Heading>
                        <List>
                          {picks
                            .slice()
                            .sort((a, b) => a.pickNumber - b.pickNumber)
                            .map((pick) => (
                              <HStack as={ListItem} key={pick.id}>
                                <Text>{pick?.pickNumber}.</Text>
                                <Text>
                                  {pick?.runner.runner.name} (Seed:{' '}
                                  {pick.runner.seed})
                                </Text>
                              </HStack>
                            ))}
                        </List>
                      </VStack>
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
