import { HStack, Heading, List, ListItem, VStack, Text } from '@chakra-ui/react'
import { MyTeamsQuery } from 'types/graphql'

import { capitalize } from 'src/lib/formatters'

type TeamMembersProps = {
  teamMembers: MyTeamsQuery['fantasyTeams'][number]['teamMembers']
  genderDivision: string
}

const TeamMembers = ({ teamMembers, genderDivision }: TeamMembersProps) => {
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
              <Text>
                {tm?.runner.runner.name} (Seed: {tm.runner.seed})
              </Text>
            </HStack>
          ))}
      </List>
    </VStack>
  )
}

export default TeamMembers
