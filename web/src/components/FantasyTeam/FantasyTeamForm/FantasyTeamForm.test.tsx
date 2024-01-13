import { render } from '@redwoodjs/testing/web'

import FantasyTeamForm from './FantasyTeamForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FantasyTeamForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FantasyTeamForm />)
    }).not.toThrow()
  })
})
