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

import FormLabel from './FormLabel'

const meta: Meta<typeof FormLabel> = {
  component: FormLabel,
}

export default meta

type Story = StoryObj<typeof FormLabel>

export const Primary: Story = {}
