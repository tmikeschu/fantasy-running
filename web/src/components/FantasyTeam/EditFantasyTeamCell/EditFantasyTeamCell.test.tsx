import { composeStories } from '@storybook/react'

import { render } from '@redwoodjs/testing/web'

import * as stories from './EditFantasyTeamCell.stories'

const Story = composeStories(stories)

describe('EditFantasyTeamCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Story.loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Story.empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Story.failure />)
    }).not.toThrow()
  })

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Story.success />)
    }).not.toThrow()
  })
})
