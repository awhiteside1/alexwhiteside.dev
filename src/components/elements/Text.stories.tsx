import type {Meta, StoryObj} from '@storybook/react'
import {GradientText} from './GradientText'

export default {
	component: GradientText,
} as Meta<typeof GradientText>

export const Example: StoryObj<typeof GradientText> = {
	args: {
		children: 'Think Different.',
	},
}


