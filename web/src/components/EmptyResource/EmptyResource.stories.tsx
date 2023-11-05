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

import EmptyResource from './EmptyResource'

const meta: Meta<typeof EmptyResource> = {
  component: EmptyResource,
}

export default meta

type Story = StoryObj<typeof EmptyResource>

export const Primary: Story = {}
