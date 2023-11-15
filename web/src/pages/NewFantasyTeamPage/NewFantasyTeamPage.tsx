import { MetaTags } from '@redwoodjs/web'

import NewFantasyTeamCell from 'src/components/NewFantasyTeamCell'

type NewFantasyTeamPageProps = {
  id: string
}
const NewFantasyTeamPage = ({
  id: fantasyEventId,
}: NewFantasyTeamPageProps) => {
  console.log({ fantasyEventId })
  return (
    <>
      <MetaTags title="NewFantasyTeam" description="NewFantasyTeam page" />

      <h1>NewFantasyTeamPage</h1>
      <NewFantasyTeamCell id={fantasyEventId} />
    </>
  )
}

export default NewFantasyTeamPage
