import { composeStories } from '@storybook/react'

import * as Test from '@redwoodjs/testing/web'

import * as stories from './AccountHeader.stories'

const Story = composeStories(stories)

describe('AccountHeader', () => {
  it('renders successfully', () => {
    Test.render(<Story.Primary />)
    Test.screen.getByText(/\w+@\w+\.\w+/i)
    Test.screen.getByAltText(/\w+@\w+\.\w+/i)
  })
})
