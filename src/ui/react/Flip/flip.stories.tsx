import type { Meta, StoryObj } from '@storybook/react'
import { FlipWords } from './flip.tsx'

export default { component: FlipWords } as Meta<typeof FlipWords>

export const phrasesExample: StoryObj<typeof FlipWords> = {
    args: {
        words: [
            'brush my teeth.',
            'only rolled my own auth once.',
            'faced fstab and won.',
            'thinks in systems.',
            'lives in Philadelphia.',
            'preaches volatility-based decomposition.',
        ],
    },
}

export const ChatGPT: StoryObj<typeof FlipWords> = {
    render: () => (
        <p>
            <span>I never thought I'd be </span>
            <FlipWords
                words={[
                    'juggling chainsaws while riding a unicycle.',
                    'competing in a yodeling contest against a goat.',
                    'teaching a group of penguins how to tap dance.',
                    'arrested for impersonating a traffic cone.',
                    "mistaken for a talking cucumber at the farmer's market.",
                ]}
            />
        </p>
    ),
}
