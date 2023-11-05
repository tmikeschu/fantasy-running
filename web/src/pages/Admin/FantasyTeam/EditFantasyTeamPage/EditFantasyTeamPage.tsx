import EditFantasyTeamCell from 'src/components/FantasyTeam/EditFantasyTeamCell'

type FantasyTeamPageProps = {
  id: string
}

const EditFantasyTeamPage = ({ id }: FantasyTeamPageProps) => {
  return <EditFantasyTeamCell id={id} />
}

export default EditFantasyTeamPage
