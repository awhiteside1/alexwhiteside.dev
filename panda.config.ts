import { defineConfig, defineKeyframes } from '@pandacss/dev'

const keyframes = defineKeyframes({
    slide: {
        from: {
            '--animation-percent': '0',
        },
        to: { '--animation-percent': '1' },
    },
    shift: {
        '0%': {
            opacity: 0,
            transform: 'translateX(-10px)',
        },
        '20%': {
            opacity: 1,
            transform: 'translateX(-2px)',
        },
        '50%': { opacity: 1, transform: 'translateX(0px)' },
        '70%': {
            opacity: 1,
            transform: 'translateX(2px)',
        },
        '100%': { opacity: 0, transform: 'translateX(10px)' },
    },
})

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ['./src/**/*.{ts,tsx,js,jsx,astro}'],
    conditions: {
        extend: {
            groupHover: '[role=group]:where(:hover, [data-hover]) &',
        },
    },
    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
        extend: { keyframes },
    },

    // The output directory for your css system
    outdir: 'styled-system',
})
