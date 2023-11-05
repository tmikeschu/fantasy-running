import { render } from '@redwoodjs/testing/web'

import MyTeamsPage from './MyTeamsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MyTeamsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MyTeamsPage />)
    }).not.toThrow()
  })
})
