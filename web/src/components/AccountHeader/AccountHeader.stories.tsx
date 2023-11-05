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

import AccountHeader from './AccountHeader'

const meta: Meta<typeof AccountHeader> = {
  component: AccountHeader,
}

export default meta

type Story = StoryObj<typeof AccountHeader>

export const Primary: Story = {}
