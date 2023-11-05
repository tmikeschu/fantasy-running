import { render } from '@redwoodjs/testing/web'

import AdminTableCrudAction from './AdminTableCrudAction'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminTableCrudAction', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminTableCrudAction />)
    }).not.toThrow()
  })
})
