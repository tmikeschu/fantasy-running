import { composeStories } from '@storybook/react'

import { render, screen, within } from '@redwoodjs/testing/web'

import * as stories from './FantasyEventsCell.stories'
const Story = composeStories(stories)

describe('FantasyEventsCell', () => {
  it('renders Loading successfully', () => {
    render(<Story.loading />)
    screen.getByLabelText('loading')
  })

  it('renders Empty successfully', async () => {
    render(<Story.empty />)
    screen.getByText(/no events yet/i)
  })

  it('renders Failure successfully', async () => {
    render(<Story.failure />)
    screen.getByRole('alert')
  })

  it('renders Success successfully', async () => {
    render(<Story.success />)
    const item = screen.getAllByRole('listitem')[0]

    within(item).getByRole('heading', { name: /\w+ \w+/ })
    within(item).getByRole('link', { name: /make a team/i })
  })
})
