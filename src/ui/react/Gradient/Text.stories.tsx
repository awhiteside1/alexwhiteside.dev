import type { Meta, StoryObj } from '@storybook/react'
import GradientText from './GradientText.astro'

export default {
    component: GradientText,
} as Meta<typeof GradientText>

export const Example: StoryObj<typeof GradientText> = {
    render: (props) => <GradientText {...props}>Hello World</GradientText>,
    args: {
        size: 6,
        color: 'orange',
    },
}
