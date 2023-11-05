import FantasyTeamRuleCell from 'src/components/FantasyTeamRule/FantasyTeamRuleCell'

type FantasyTeamRulePageProps = {
  id: string
}

const FantasyTeamRulePage = ({ id }: FantasyTeamRulePageProps) => {
  return <FantasyTeamRuleCell id={id} />
}

export default FantasyTeamRulePage
