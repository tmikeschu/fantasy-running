import { render } from '@redwoodjs/testing/web'

import LoadingTable from './LoadingTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoadingTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoadingTable />)
    }).not.toThrow()
  })
})
