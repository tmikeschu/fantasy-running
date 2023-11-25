/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { composeStories } from '@storybook/react'
import userEvent from '@testing-library/user-event'

import { render, screen, within, act } from '@redwoodjs/testing/web'

import * as stories from './MyTeamsCell.stories'

const Story = composeStories(stories)

describe('MyTeamsCell', () => {
  it('renders Loading successfully', () => {
    render(<Story.loading />)
    screen.getByLabelText('loading')
  })

  it('renders Empty successfully', async () => {
    render(<Story.empty />)
    screen.getByText(/no teams yet/i)
    screen.getByRole('link', { name: /create one/i })
  })

  it('renders Failure successfully', async () => {
    render(<Story.failure />)
    screen.getByRole('alert')
  })

  it('renders Success successfully', async () => {
    window.scrollTo = jest.fn()
    const user = userEvent.setup()
    render(<Story.success />)
    const accordionButtons = screen.getAllByRole('button', { name: /USA OTQ/i })
    // TODO figure out why act is required
    await act(async () => await user.click(accordionButtons[0]))
    const firstRegion = await within(
      accordionButtons[0].parentElement!
    ).findByRole('region')
    const firstWomensHeading = within(firstRegion).getByRole('heading', {
      name: /women/i,
    })
    within(firstRegion).getByRole('heading', { name: /^men/i })

    const firstWomensList = within(firstWomensHeading.parentElement!).getByRole(
      'list'
    )
    const firstWomensListItems =
      within(firstWomensList).getAllByRole('listitem')
    expect(firstWomensListItems.length).toEqual(7)
    const firstPickA = firstWomensListItems[0]

    await act(async () => await user.click(accordionButtons[1]))
    const secondRegion = await within(
      accordionButtons[1].parentElement!
    ).findByRole('region')
    const secondWomensHeading = within(secondRegion).getByRole('heading', {
      name: /women/i,
    })
    within(secondRegion).getByRole('heading', { name: /^men/i })
    const secondWomensList = within(
      secondWomensHeading.parentElement!
    ).getByRole('list')
    const secondWomensListItems =
      within(secondWomensList).getAllByRole('listitem')
    expect(secondWomensListItems.length).toEqual(7)
    const firstPickB = secondWomensListItems[0]

    expect(firstPickA).not.toHaveTextContent(firstPickB.textContent ?? '')
  })
})
