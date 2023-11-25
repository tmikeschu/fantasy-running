import { render } from '@redwoodjs/testing/web'

import AdminTableWrapper from './AdminTableWrapper'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminTableWrapper', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminTableWrapper />)
    }).not.toThrow()
  })
})
