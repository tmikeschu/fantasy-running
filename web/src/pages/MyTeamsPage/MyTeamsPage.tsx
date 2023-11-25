import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import MyTeamsCell from 'src/components/FantasyTeam/MyTeamsCell'

const MyTeamsPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="MyTeams" description="MyTeams page" />

      {currentUser ? <MyTeamsCell ownerId={currentUser.id} /> : null}
    </>
  )
}

export default MyTeamsPage
