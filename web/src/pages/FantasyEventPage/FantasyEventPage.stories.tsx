import type { Meta, StoryObj } from '@storybook/react'

import FantasyEventPage from './FantasyEventPage'

const meta: Meta<typeof FantasyEventPage> = {
  component: FantasyEventPage,
}

export default meta

type Story = StoryObj<typeof FantasyEventPage>

export const Primary: Story = {}
