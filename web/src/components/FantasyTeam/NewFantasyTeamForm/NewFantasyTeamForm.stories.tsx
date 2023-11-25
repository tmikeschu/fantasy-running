import type { Meta, StoryObj } from '@storybook/react'

import { standard } from '../NewFantasyTeamCell/NewFantasyTeamCell.mock'

import NewFantasyTeamForm from './NewFantasyTeamForm'

const meta: Meta<typeof NewFantasyTeamForm> = {
  component: NewFantasyTeamForm,
  args: {
    fantasyEvent: standard().fantasyEvent,
  },
}

export default meta

type Story = StoryObj<typeof NewFantasyTeamForm>

export const Primary: Story = {}
