import React from 'react'

import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  ListItem,
  HStack,
  List,
  Heading,
  VStack,
  Card,
  CardHeader,
  FormControl,
  Checkbox,
} from '@chakra-ui/react'
import pluralize from 'pluralize'
import { match } from 'ts-pattern'
import type { FindFantasyEvent } from 'types/graphql'

import { capitalize } from 'src/lib/formatters'

// TODO move to fantasy event config
const DNF_POINTS_MEN = 226
const DNF_POINTS_WOMEN = 174

const FantasyEventList = ({ fantasyEvent, teamsReport }: FindFantasyEvent) => {
  const [showNoDNFsByGender, setShowNoDNFsByGender] = React.useState(false)

  const shownTeams = teamsReport
    .slice()
    .filter((report) => {
      if (!showNoDNFsByGender) return true

      const { men, women } = report.teamMembers.reduce(
        (acc, el) => {
          if (!el.genderDivision) return acc
          acc[el.genderDivision].push(el)
          return acc
        },
        { men: [], women: [] } as Record<string, typeof report.teamMembers>
      )

      return (
        men.every((x) => x.points !== DNF_POINTS_MEN) ||
        women.every((x) => x.points !== DNF_POINTS_WOMEN)
      )
    })
    .sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return -1
      if (a.totalPoints > b.totalPoints) return 1
      if (a.dnfCount < b.dnfCount) return -1
      if (a.dnfCount > b.dnfCount) return 1
      return 0
    })

  return (
    <VStack alignItems="flex-start" spacing="8">
      <Heading>{fantasyEvent?.name || fantasyEvent?.event.name}</Heading>

      <HStack>
        <FormControl>
          <Checkbox
            checked={showNoDNFsByGender}
            onChange={(e) => setShowNoDNFsByGender(e.target.checked)}
          >
            Show no DNFs by gender
          </Checkbox>
        </FormControl>
      </HStack>

      {shownTeams.length === 0 ? (
        <Card w="auto">
          <CardHeader>
            <Heading fontSize="lg">No teams to display 😬</Heading>
          </CardHeader>
        </Card>
      ) : (
        <>
          <Text fontSize="sm" color="gray.500">
            {pluralize('result', shownTeams.length, true)}
          </Text>
          <Accordion allowMultiple allowToggle w="full">
            {shownTeams.map((team) => (
              <AccordionItem key={team.id}>
                <AccordionButton>
                  <HStack>
                    <Text color="gray.500">{team.name || '(unnamed)'}</Text>
                    <Text fontWeight="medium" color="gray.600">
                      {team.owner}
                    </Text>
                    <Text fontWeight="bold" color="blue.500">
                      {team.totalPoints}
                    </Text>
                    {team.dnfCount ? (
                      <Text fontSize="sm" fontWeight="bold" color="red.500">
                        {pluralize('DNF', team.dnfCount, true)}
                      </Text>
                    ) : null}
                  </HStack>
                </AccordionButton>
                <AccordionPanel boxShadow="sm">
                  <HStack fontSize="lg" color="blue.500">
                    <Text fontWeight="bold" noOfLines={1} maxW="full">
                      Total
                    </Text>
                    <Text fontWeight="bold">{team.totalPoints}</Text>
                  </HStack>
                  {Object.entries(
                    team.teamMembers.reduce(
                      (acc, el) => {
                        if (!el.genderDivision) return acc
                        acc[el.genderDivision].push(el)
                        return acc
                      },
                      { women: [], men: [] } as Record<
                        string,
                        typeof team.teamMembers
                      >
                    )
                  ).map(([division, teamMembers]) => (
                    <VStack key={division} alignItems="flex-start" mt="4">
                      <Heading as="h4" fontSize="lg">
                        {capitalize(division)}
                      </Heading>

                      <List>
                        {teamMembers.map((teamMember) => (
                          <ListItem key={teamMember.name}>
                            <HStack>
                              <Text
                                fontWeight="bold"
                                color="gray.700"
                                noOfLines={1}
                                maxW="full"
                              >
                                {teamMember.name}
                              </Text>
                              <Text fontSize="sm" color="gray.500">
                                {teamMember.points}
                              </Text>
                              {match(teamMember)
                                .with(
                                  {
                                    genderDivision: 'women',
                                    points: DNF_POINTS_WOMEN,
                                  },
                                  {
                                    genderDivision: 'men',
                                    points: DNF_POINTS_MEN,
                                  },
                                  () => (
                                    <Text fontSize="xs" color="red.400">
                                      DNF
                                    </Text>
                                  )
                                )
                                .otherwise(() => null)}
                            </HStack>
                          </ListItem>
                        ))}

                        <ListItem>
                          <HStack color="blue.500" fontSize="sm">
                            <Text fontWeight="bold" noOfLines={1} maxW="full">
                              Total
                            </Text>
                            <Text fontSize="sm" fontWeight="bold">
                              {teamMembers
                                .map((tm) => tm.points)
                                .reduce((a, b) => (a ?? 0) + (b ?? 0), 0)}
                            </Text>
                          </HStack>
                        </ListItem>
                      </List>
                    </VStack>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </VStack>
  )
}

export default FantasyEventList
