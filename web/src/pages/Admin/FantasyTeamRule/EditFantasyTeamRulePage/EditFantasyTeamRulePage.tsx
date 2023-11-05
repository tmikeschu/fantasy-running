import EditFantasyTeamRuleCell from 'src/components/FantasyTeamRule/EditFantasyTeamRuleCell'

type FantasyTeamRulePageProps = {
  id: string
}

const EditFantasyTeamRulePage = ({ id }: FantasyTeamRulePageProps) => {
  return <EditFantasyTeamRuleCell id={id} />
}

export default EditFantasyTeamRulePage
