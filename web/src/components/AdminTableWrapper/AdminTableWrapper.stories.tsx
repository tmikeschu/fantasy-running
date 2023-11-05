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

import AdminTableWrapper from './AdminTableWrapper'

const meta: Meta<typeof AdminTableWrapper> = {
  component: AdminTableWrapper,
}

export default meta

type Story = StoryObj<typeof AdminTableWrapper>

export const Primary: Story = {}
