import type { Meta, StoryObj } from '@storybook/react'

import { standard } from '../NewFantasyTeamCell/NewFantasyTeamCell.mock'

import FantasyTeamForm from './FantasyTeamForm'

const meta: Meta<typeof FantasyTeamForm> = {
  component: FantasyTeamForm,
  args: {
    fantasyEvent: standard().fantasyEvent,
  },
}

export default meta

type Story = StoryObj<typeof FantasyTeamForm>

export const Primary: Story = {}
