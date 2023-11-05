import { render } from '@redwoodjs/testing/web'

import EmptyResource from './EmptyResource'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EmptyResource', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmptyResource />)
    }).not.toThrow()
  })
})
