import {
  Skeleton,
  Stat,
  StatNumber,
  StatLabel,
  StatHelpText,
  Wrap,
  WrapItem,
  Card,
  CardBody,
  Heading,
  ListItem,
  Text,
  HStack,
  OrderedList,
  Tooltip,
  FormControl,
  Input,
  FormLabel,
} from '@chakra-ui/react'
import pluralize from 'pluralize'
import type { FantasyEventQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EmptyResource from 'src/components/EmptyResource/EmptyResource'
import ErrorAlert from 'src/components/ErrorAlert/ErrorAlert'

export const QUERY = gql`
  query FantasyEventQuery($id: String!) {
    fantasyEvent: fantasyEvent(id: $id) {
      id
      status
      name
      teamCount
      event {
        name
      }
    }

    stats: getFantasyEventStats(id: $id) {
      mostFrequentlyPickedMensRunner {
        runnerName
        teamCount
      }
      mostFrequentlyPickedWomensRunner {
        runnerName
        teamCount
      }
      teamCount
      topMensTeamByFrequency {
        runnerName
        teamCount
      }
      topWomensTeamByFrequency {
        runnerName
        teamCount
      }
      timeUntilEventStart
    }

    eventRunnerResults: eventRunnerResults(fantasyEventId: $id) {
      id
      time
      eventRunner {
        id
        runner {
          name
          genderDivision
        }
      }
    }
  }
`

export const Loading = () => <Skeleton />

export const Empty = () => <EmptyResource>events</EmptyResource>

export const Failure = ({ error }: CellFailureProps) => (
  <ErrorAlert message={error?.message} />
)

export const Success = ({
  fantasyEvent,
  stats,
  eventRunnerResults,
}: CellSuccessProps<FantasyEventQuery>) => {
  const daysUntilEvent = Math.ceil(
    stats.timeUntilEventStart / 1000 / 60 / 60 / 24
  )

  const isOver = daysUntilEvent <= 0

  const [runnersShown, setRunnersShown] = React.useState(10)
  const [runnerQuery, setRunnerQuery] = React.useState('')

  const top = [
    ["Women's", 'women'],
    ["Men's", 'men'],
  ].map(([possesive, genderDivision]) => [
    possesive,
    eventRunnerResults
      .filter(
        (r) =>
          r.eventRunner.runner.genderDivision === genderDivision &&
          (!runnerQuery ||
            r.eventRunner.runner.name
              .toLowerCase()
              .includes(runnerQuery.toLowerCase()))
      )
      .slice(0, runnerQuery ? Infinity : runnersShown),
  ]) as [string, typeof eventRunnerResults][]

  return (
    <>
      <Heading color="gray.700">
        {fantasyEvent?.name || fantasyEvent?.event.name || 'Fantasy Event'}
      </Heading>

      {isOver ? (
        <Card w={{ base: 'full', md: 'auto' }}>
          <CardBody>
            <Stat>
              <StatNumber>🏁 That&apos;s a wrap! 🏁</StatNumber>
            </Stat>
          </CardBody>
        </Card>
      ) : null}

      <Wrap>
        <WrapItem>
          <FormControl w={{ base: 'full', md: 'auto' }}>
            <FormLabel>Top #</FormLabel>
            <Input
              value={runnersShown}
              onChange={(e) => setRunnersShown(Number(e.target.value))}
            />
          </FormControl>
        </WrapItem>

        <WrapItem>
          <FormControl w={{ base: 'full', md: 'auto' }}>
            <FormLabel>Find runner</FormLabel>
            <Input
              value={runnerQuery}
              onChange={(e) => setRunnerQuery(e.target.value)}
            />
          </FormControl>
        </WrapItem>
      </Wrap>

      <Wrap w="full">
        {isOver ? (
          <>
            {top.map(([possesive, tops]) => (
              <WrapItem key={possesive}>
                <Card>
                  <CardBody>
                    <Text fontSize="lg" fontWeight="bold" mb="4">
                      {runnerQuery
                        ? possesive
                        : `${possesive} top ${runnersShown}`}
                    </Text>
                    <OrderedList>
                      {tops.map((result) => (
                        <ListItem key={result.id}>
                          <HStack>
                            <Tooltip
                              label={result.eventRunner.runner.name}
                              openDelay={500}
                              hasArrow
                            >
                              <Text
                                fontWeight="bold"
                                color="gray.700"
                                noOfLines={1}
                                maxW="full"
                              >
                                {result.eventRunner.runner.name}
                              </Text>
                            </Tooltip>
                            <Text fontSize="xs" color="gray.500">
                              {result.time}
                            </Text>
                          </HStack>
                        </ListItem>
                      ))}
                    </OrderedList>
                  </CardBody>
                </Card>
              </WrapItem>
            ))}
          </>
        ) : (
          <>
            <WrapItem>
              <Card>
                <CardBody>
                  <Stat>
                    <StatLabel>Countdown ⏳</StatLabel>
                    <StatNumber>{daysUntilEvent}</StatNumber>
                    <StatHelpText>
                      {pluralize('day', daysUntilEvent)}
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </WrapItem>

            <WrapItem>
              <Card>
                <CardBody>
                  <Stat>
                    <StatLabel>Team count 🎉</StatLabel>
                    <StatNumber>{stats.teamCount}</StatNumber>
                    <StatHelpText>&nbsp;</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </WrapItem>

            {(
              [
                [
                  `Women's ${WOMEN_RUNNER_EMOJI}`,
                  stats.mostFrequentlyPickedWomensRunner,
                ],
                [
                  `Men's ${MEN_RUNNER_EMOJI}`,
                  stats.mostFrequentlyPickedMensRunner,
                ],
              ] as [string, typeof stats.mostFrequentlyPickedMensRunner][]
            ).map(([possesiveGender, stat]) => (
              <WrapItem key={possesiveGender}>
                <Card>
                  <CardBody>
                    <Stat>
                      <StatLabel>{possesiveGender} most picked</StatLabel>
                      <StatNumber>{stat.runnerName}</StatNumber>
                      <StatHelpText>
                        on {pluralize('team', stat.teamCount, true)}
                      </StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
              </WrapItem>
            ))}
          </>
        )}
      </Wrap>

      {isOver ? null : (
        <Wrap w="full">
          {(
            [
              [`Women's ${WOMEN_RUNNER_EMOJI}`, stats.topWomensTeamByFrequency],
              [`Men's ${MEN_RUNNER_EMOJI}`, stats.topMensTeamByFrequency],
            ] as [string, typeof stats.topMensTeamByFrequency][]
          ).map(([possesiveGender, stat]) => (
            <WrapItem key={possesiveGender} w={{ base: 'full', lg: '49%' }}>
              <Card w="full">
                <CardBody>
                  <Text fontSize="lg" fontWeight="bold" mb="4">
                    {possesiveGender} team picks
                  </Text>
                  <OrderedList>
                    {stat.map((x, i) => (
                      <ListItem key={i}>
                        <HStack>
                          <Tooltip
                            label={x.runnerName}
                            openDelay={500}
                            hasArrow
                          >
                            <Text
                              fontWeight="bold"
                              color="gray.700"
                              noOfLines={1}
                              maxW="full"
                            >
                              {x.runnerName}
                            </Text>
                          </Tooltip>
                          <Text fontSize="xs" color="gray.500">
                            (on {pluralize('team', x.teamCount, true)})
                          </Text>
                        </HStack>
                      </ListItem>
                    ))}
                  </OrderedList>
                </CardBody>
              </Card>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  )
}

const WOMEN_RUNNER_EMOJI = '🏃‍♀️'
const MEN_RUNNER_EMOJI = '🏃‍♂️'
