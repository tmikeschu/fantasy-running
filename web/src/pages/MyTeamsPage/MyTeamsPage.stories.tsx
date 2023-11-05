import type { Meta, StoryObj } from '@storybook/react'

import MyTeamsPage from './MyTeamsPage'

const meta: Meta<typeof MyTeamsPage> = {
  component: MyTeamsPage,
}

export default meta

type Story = StoryObj<typeof MyTeamsPage>

export const Primary: Story = {}
