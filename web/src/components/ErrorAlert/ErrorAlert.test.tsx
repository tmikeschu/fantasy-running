import { render } from '@redwoodjs/testing/web'

import ErrorAlert from './ErrorAlert'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ErrorAlert', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ErrorAlert />)
    }).not.toThrow()
  })
})
