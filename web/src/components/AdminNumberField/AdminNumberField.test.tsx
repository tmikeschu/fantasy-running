import { render } from '@redwoodjs/testing/web'

import AdminNumberField from './AdminNumberField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminNumberField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminNumberField />)
    }).not.toThrow()
  })
})
