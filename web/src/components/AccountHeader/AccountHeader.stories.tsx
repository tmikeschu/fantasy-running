import type { Meta, StoryObj } from '@storybook/react'

import Generator from 'src/test/generators'

import AccountHeader from './AccountHeader'

const meta: Meta<typeof AccountHeader> = {
  component: AccountHeader,
  args: {
    currentUser: Generator.generateCurrentUser(),
  },
}

export default meta

type Story = StoryObj<typeof AccountHeader>

export const Primary: Story = {}
