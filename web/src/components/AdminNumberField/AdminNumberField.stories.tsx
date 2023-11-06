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

import AdminNumberField from './AdminNumberField'

const meta: Meta<typeof AdminNumberField> = {
  component: AdminNumberField,
}

export default meta

type Story = StoryObj<typeof AdminNumberField>

export const Primary: Story = {}
