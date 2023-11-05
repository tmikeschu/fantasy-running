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

import NavItem from './NavItem'

const meta: Meta<typeof NavItem> = {
  component: NavItem,
}

export default meta

type Story = StoryObj<typeof NavItem>

export const Primary: Story = {}
