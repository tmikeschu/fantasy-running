import { HStack, Heading, List, ListItem, VStack, Text } from '@chakra-ui/react'
import { FantasyEventStatus, MyTeamsQuery } from 'types/graphql'

import { capitalize } from 'src/lib/formatters'

type TeamMembersProps = {
  teamMembers: MyTeamsQuery['fantasyTeams'][number]['teamMembers']
  genderDivision: string
  eventStatus: FantasyEventStatus
}

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
                  <Text color="green.500" fontWeight="bold">
                    {tm.runner.result.time}
                  </Text>
                ) : (
                  <Text color="red.500" fontWeight="bold">
                    DNF
                  </Text>
                )
              ) : null}
            </HStack>
          ))}
      </List>
    </VStack>
  )
}

export default TeamMembers
