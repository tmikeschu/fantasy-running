// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import AdminTableCrudAction from './AdminTableCrudAction'

const meta: Meta<typeof AdminTableCrudAction> = {
  component: AdminTableCrudAction,
}

export default meta

type Story = StoryObj<typeof AdminTableCrudAction>

export const Primary: Story = {}
