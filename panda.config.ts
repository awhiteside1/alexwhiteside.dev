import { defineConfig, defineKeyframes } from '@pandacss/dev'

const keyframes = defineKeyframes({
    startTransition: {
        '0%': {
            opacity: 0,
            top: '200px',
            transform: 'scale(0.5)',
            height: 0,
        },
        '40%': {
            opacity: 1,
        },
        '100%': {
            top: '22px',
            opacity: 1,
            transform: 'scale(1)',
            height: '15px',
            boxShadow: '0 5px 10px -2px rgba(0, 0, 0, 0.2)',
        },
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
