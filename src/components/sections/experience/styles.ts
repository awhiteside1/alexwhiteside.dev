import { css } from '@styles/css'

export const stacked = css({
    position: 'absolute',
    inset: '10px',
    borderRadius: '10px',
    backdropBlur: '2xl',
    opacity: 0,
    transition: 'all 0.5s ease-in',
    transform: 'translateX(-10px)',
})
