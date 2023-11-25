import { render } from '@redwoodjs/testing/web'

import FormErrorMessage from './FormErrorMessage'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FormErrorMessage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FormErrorMessage />)
    }).not.toThrow()
  })
})
