import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="AdminHome" description="AdminHome page" />

      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      <p>
        My default route is named <code>adminHome</code>, link to me with `
        <Link to={routes.adminHome()}>AdminHome</Link>`
      </p>
    </>
  )
}

export default HomePage
