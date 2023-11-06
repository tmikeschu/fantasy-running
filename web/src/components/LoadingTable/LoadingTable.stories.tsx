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

import LoadingTable from './LoadingTable'

const meta: Meta<typeof LoadingTable> = {
  component: LoadingTable,
}

export default meta

type Story = StoryObj<typeof LoadingTable>

export const Primary: Story = {}
