import { render } from '@redwoodjs/testing/web'

import NavGroup from './NavGroup'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavGroup', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavGroup />)
    }).not.toThrow()
  })
})
