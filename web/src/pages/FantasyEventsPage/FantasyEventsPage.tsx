import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const FantasyEventsPage = () => {
  return (
    <>
      <MetaTags title="FantasyEvents" description="FantasyEvents page" />

      <h1>FantasyEventsPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/FantasyEventsPage/FantasyEventsPage.tsx</code>
      </p>
      <p>
        My default route is named <code>fantasyEvents</code>, link to me with `
        <Link to={routes.fantasyEvents()}>FantasyEvents</Link>`
      </p>
    </>
  )
}

export default FantasyEventsPage
