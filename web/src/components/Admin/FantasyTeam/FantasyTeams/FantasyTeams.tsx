import type { FindFantasyTeams } from 'types/graphql'

import { timeTag, truncate } from 'src/lib/formatters'

const AdminFantasyTeamsList = ({ fantasyTeams }: FindFantasyTeams) => {
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>User id</th>
            <th>Fantasy event id</th>
            <th>Fantasy team wager id</th>
            <th>Created at</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          {fantasyTeams.map((fantasyTeam) => (
            <tr key={fantasyTeam.id}>
              <td>{truncate(fantasyTeam.id)}</td>
              <td>{truncate(fantasyTeam.name ?? '(unknown)')}</td>
              <td>{truncate(fantasyTeam.userId)}</td>
              <td>{truncate(fantasyTeam.fantasyEventId)}</td>
              <td>{truncate(fantasyTeam.fantasyTeamWagerId)}</td>
              <td>{timeTag(fantasyTeam.createdAt)}</td>
              <td>{timeTag(fantasyTeam.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminFantasyTeamsList
