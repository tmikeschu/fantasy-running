import { MetaTags } from '@redwoodjs/web'

import MyTeamsCell from 'src/components/MyTeamsCell'

const MyTeamsPage = () => {
  return (
    <>
      <MetaTags title="MyTeams" description="MyTeams page" />

      <MyTeamsCell />
    </>
  )
}

export default MyTeamsPage
