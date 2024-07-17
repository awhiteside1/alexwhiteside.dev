import type { Meta, StoryObj } from '@storybook/react'
import GradientText from './GradientText.astro?raw'

export default {
    component: 'GradientText',
} 

export const Example: StoryObj<typeof GradientText> = {
    render: (props) => <code>{GradientText}</code>,
    args: {
        // size: 6,
        // color: 'orange',
    },
}
