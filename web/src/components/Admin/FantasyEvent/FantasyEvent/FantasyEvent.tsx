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
  Card,
  CardHeader,
} from '@chakra-ui/react'
import pluralize from 'pluralize'
import type { FindFantasyEvent } from 'types/graphql'

const FantasyEventList = ({ fantasyEvent, teamsReport }: FindFantasyEvent) => {
  const [showDqed, setShowDqed] = React.useState(false)

  const shownTeams = teamsReport
    .filter((team) => showDqed || !team.dqed)
    .sort((a, b) => a.totalPoints - b.totalPoints)

  return (
    <VStack alignItems="flex-start" spacing="8">
      <Heading>{fantasyEvent?.name || fantasyEvent?.event.name}</Heading>

      <HStack>
        <FormControl display="flex">
          <Checkbox
            checked={showDqed}
            onChange={(e) => setShowDqed(e.target.checked)}
          >
            Show DQed
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
                    <Text
                      variant="sm"
                      fontWeight="bold"
                      color={team.dqed ? 'red.500' : 'green.500'}
                    >
                      {team.totalPoints}
                    </Text>
                    {team.dqed ? (
                      <Text
                        fontSize="xs"
                        fontWeight="bold"
                        as="span"
                        color="red.500"
                        ml="1"
                        textTransform="uppercase"
                      >
                        DQed
                      </Text>
                    ) : null}
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
                          color={team.dqed ? 'red.500' : 'green.500'}
                          noOfLines={1}
                          maxW="full"
                        >
                          Total
                        </Text>
                        <Text
                          fontSize="sm"
                          fontWeight="bold"
                          color={team.dqed ? 'red.500' : 'green.500'}
                        >
                          {team.totalPoints}
                        </Text>
                        {team.dqed ? (
                          <Text
                            fontWeight="medium"
                            fontSize="xs"
                            as="span"
                            color="red.500"
                            ml="1"
                            textTransform="uppercase"
                          >
                            DQed
                          </Text>
                        ) : null}
                      </HStack>
                    </ListItem>
                  </List>
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
