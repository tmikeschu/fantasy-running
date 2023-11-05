import { render } from '@redwoodjs/testing/web'

import FantasyEventsPage from './FantasyEventsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FantasyEventsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FantasyEventsPage />)
    }).not.toThrow()
  })
})
