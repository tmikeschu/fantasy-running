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
} from '@chakra-ui/react'
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
}: CellSuccessProps<FantasyEventQuery>) => {
  return (
    <>
      <Heading color="gray.700">
        {fantasyEvent?.name || fantasyEvent?.event.name || 'Fantasy Event'}
      </Heading>
      <Wrap w="full">
        <WrapItem>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Team count 🎉</StatLabel>
                <StatNumber>{stats.teamCount}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </WrapItem>

        {(
          [
            ["Women's 🏃‍♀️", stats.mostFrequentlyPickedWomensRunner],
            ["Men's 🏃‍♂️", stats.mostFrequentlyPickedMensRunner],
          ] as [string, typeof stats.mostFrequentlyPickedMensRunner][]
        ).map(([possesiveGender, stat]) => (
          <WrapItem key={possesiveGender}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>{possesiveGender} most picked</StatLabel>
                  <StatNumber>{stat.runnerName}</StatNumber>
                  <StatHelpText>on {stat.teamCount} teams</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </WrapItem>
        ))}
      </Wrap>
    </>
  )
}
