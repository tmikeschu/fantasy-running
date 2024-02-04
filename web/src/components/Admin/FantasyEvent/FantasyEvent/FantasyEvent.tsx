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
  FormControl,
  Checkbox,
  FormLabel,
} from '@chakra-ui/react'
import type { FindFantasyEvent } from 'types/graphql'

const FantasyEventList = ({ fantasyEvent, teamsReport }: FindFantasyEvent) => {
  const [showDqed, setShowDqed] = React.useState(false)

  const shownTeams = teamsReport
    .filter((team) => showDqed || !team.dqed)
    .sort((a, b) => b.totalPoints - a.totalPoints)

  return (
    <VStack alignItems="flex-start" spacing="8">
      <Heading>{fantasyEvent?.name || fantasyEvent?.event.name}</Heading>
      <HStack>
        <FormControl>
          <FormLabel>Show DQed</FormLabel>
          <Checkbox
            checked={showDqed}
            onChange={(e) => setShowDqed(e.target.checked)}
          />
        </FormControl>
      </HStack>

      <Accordion allowMultiple allowToggle w="full">
        {shownTeams.map((team) => (
          <AccordionItem key={team.id}>
            <AccordionButton>
              <HStack>
                <Text color="gray.500">{team.name || '(unnamed)'}</Text>
                <Text fontWeight="medium" color="gray.600">
                  {team.owner}
                </Text>
                <Text variant="sm" fontWeight="bold">
                  {team.totalPoints}
                  {team.dqed ? (
                    <Text
                      fontSize="xs"
                      as="span"
                      color="red.500"
                      ml="1"
                      textTransform="uppercase"
                    >
                      DQed
                    </Text>
                  ) : (
                    ''
                  )}
                </Text>
              </HStack>
            </AccordionButton>
            <AccordionPanel boxShadow="sm">
              <List>
                {team.teamMembers.map((teamMember) => (
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
                        {teamMember.points ? `${teamMember.points}` : 'DNF'}
                      </Text>
                    </HStack>
                  </ListItem>
                ))}

                <ListItem>
                  <HStack>
                    <Text
                      fontWeight="bold"
                      color="gray.700"
                      noOfLines={1}
                      maxW="full"
                    >
                      Total
                    </Text>
                    <Text fontSize="sm" fontWeight="bold" color="gray.500">
                      {team.totalPoints}
                      {team.dqed ? ' (DQed)' : ''}
                    </Text>
                  </HStack>
                </ListItem>
              </List>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  )
}

export default FantasyEventList
