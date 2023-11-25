import type { FindFantasyTeamById } from 'types/graphql'

import { timeTag } from 'src/lib/formatters'

interface Props {
  fantasyTeam: NonNullable<FindFantasyTeamById['fantasyTeam']>
}

const FantasyTeam = ({ fantasyTeam }: Props) => {
  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            FantasyTeam {fantasyTeam.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{fantasyTeam.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{fantasyTeam.name}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{fantasyTeam.userId}</td>
            </tr>
            <tr>
              <th>Fantasy event id</th>
              <td>{fantasyTeam.fantasyEventId}</td>
            </tr>
            <tr>
              <th>Fantasy team wager id</th>
              <td>{fantasyTeam.fantasyTeamWagerId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(fantasyTeam.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(fantasyTeam.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default FantasyTeam
