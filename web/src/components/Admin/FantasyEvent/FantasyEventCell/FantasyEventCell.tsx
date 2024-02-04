import type { FindFantasyEvent } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FantasyEvent from 'src/components/Admin/FantasyEvent/FantasyEvent'
import EmptyResource from 'src/components/EmptyResource/EmptyResource'

export const QUERY = gql`
  query FindFantasyEvent($id: String!) {
    fantasyEvent(id: $id) {
      id
      eventId
      name
      event {
        name
      }
      teamSize
      createdAt
      updatedAt
    }

    teamsReport: getFantasyEventTeamsReport(id: $id) {
      id
      name
      owner
      dqed
      totalPoints
      dnfCount

      teamMembers {
        name
        points
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <EmptyResource>fantasy event</EmptyResource>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  fantasyEvent,
  teamsReport,
}: CellSuccessProps<FindFantasyEvent>) => {
  return <FantasyEvent fantasyEvent={fantasyEvent} teamsReport={teamsReport} />
}
