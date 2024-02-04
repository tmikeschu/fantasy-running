import { HStack, Heading, List, ListItem, VStack, Text } from '@chakra-ui/react'
import pluralize from 'pluralize'
import { FantasyEventStatus, MyTeamsQuery } from 'types/graphql'

import { capitalize } from 'src/lib/formatters'

type TeamMembersProps = {
  teamMembers: MyTeamsQuery['fantasyTeams'][number]['teamMembers']
  genderDivision: string
  eventStatus: FantasyEventStatus
}

// TODO move to fantasy event config
const DNF_POINTS_MEN = 226
const DNF_POINTS_WOMEN = 174
const MAX_SCORING_PICK = 5

const TeamMembers = ({
  teamMembers,
  genderDivision,
  eventStatus,
}: TeamMembersProps) => {
  return (
    <VStack alignItems="flex-start" spacing="4">
      <Heading fontSize="lg">{capitalize(genderDivision)}</Heading>
      <List>
        {teamMembers
          .slice()
          .sort((a, b) => a.pickNumber - b.pickNumber)
          .map((tm) => (
            <HStack as={ListItem} key={tm.id}>
              <Text>{tm?.pickNumber}.</Text>
              <Text>{tm?.runner.runner.name}</Text>
              <Text fontSize="sm" color="gray.500">
                Seed {tm.runner.seed}
              </Text>
              {eventStatus === 'COMPLETE' ? (
                tm.runner.result ? (
                  <>
                    <Text color="green.500" fontWeight="bold">
                      {tm.runner.result.time}
                    </Text>
                    <Text
                      fontSize="sm"
                      color={
                        tm.pickNumber > MAX_SCORING_PICK
                          ? 'gray.400'
                          : 'gray.700'
                      }
                      fontWeight="bold"
                    >
                      {pluralize('point', tm.runner.result.points, true)}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text fontSize="sm" color="red.500" fontWeight="bold">
                      DNF
                    </Text>
                    <Text
                      fontSize="sm"
                      color={
                        tm.pickNumber > MAX_SCORING_PICK
                          ? 'gray.400'
                          : 'gray.700'
                      }
                      fontWeight="bold"
                    >
                      {pluralize(
                        'point',
                        tm.runner.runner.genderDivision === 'men'
                          ? DNF_POINTS_MEN
                          : DNF_POINTS_WOMEN,
                        true
                      )}
                    </Text>
                  </>
                )
              ) : null}
            </HStack>
          ))}
      </List>
    </VStack>
  )
}

export default TeamMembers
