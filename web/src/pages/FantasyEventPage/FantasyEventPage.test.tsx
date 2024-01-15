import { render } from '@redwoodjs/testing/web'

import FantasyEventPage from './FantasyEventPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FantasyEventPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FantasyEventPage />)
    }).not.toThrow()
  })
})
