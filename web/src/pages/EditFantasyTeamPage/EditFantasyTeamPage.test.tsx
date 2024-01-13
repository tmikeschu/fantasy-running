import { render } from '@redwoodjs/testing/web'

import NewFantasyTeamPage from './EditFantasyTeamPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewFantasyTeamPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewFantasyTeamPage />)
    }).not.toThrow()
  })
})
