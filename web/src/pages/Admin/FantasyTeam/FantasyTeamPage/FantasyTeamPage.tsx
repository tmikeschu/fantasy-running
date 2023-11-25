import FantasyTeamCell from 'src/components/Admin/FantasyTeam/FantasyTeamCell'

type FantasyTeamPageProps = {
  id: string
}

const FantasyTeamPage = ({ id }: FantasyTeamPageProps) => {
  return <FantasyTeamCell id={id} />
}

export default FantasyTeamPage
