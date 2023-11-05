import type { Meta, StoryObj } from '@storybook/react'

import FantasyEventsPage from './FantasyEventsPage'

const meta: Meta<typeof FantasyEventsPage> = {
  component: FantasyEventsPage,
}

export default meta

type Story = StoryObj<typeof FantasyEventsPage>

export const Primary: Story = {}
