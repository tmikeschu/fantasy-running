import { render } from '@redwoodjs/testing/web'

import NewFantasyTeamForm from './NewFantasyTeamForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewFantasyTeamForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewFantasyTeamForm />)
    }).not.toThrow()
  })
})
