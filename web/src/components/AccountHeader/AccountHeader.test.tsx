import { render } from '@redwoodjs/testing/web'

import AccountHeader from './AccountHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AccountHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountHeader />)
    }).not.toThrow()
  })
})
