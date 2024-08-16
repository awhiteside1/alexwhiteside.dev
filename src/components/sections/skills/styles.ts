import { defineStyles } from '@pandacss/dev'
import { css } from '@styles/css'

const hexagonStyles = defineStyles({
    '--hex-color': 'blue',
    '--hex-width': '50px',
    '--hex-margin': '5px',
    '--hex-height': 'calc(var(--hex-width) / cos(30deg))',
    '--hex-offset-height':
        'calc(2 * (var(--hex-height) - (var(--hex-height) / 4)))',
})

export const hexagonContainer = css({
    display: 'flex',
    position: 'relative',
    // height: '100%',
    // width: '100%',
    width: 'calc(var(--hex-width) / 2 + 100%)',
    left: 'calc( - 0.5 * var(--hex-width))',
    '--hex-color': '#f3f3f3',
    '--hex-width': '150px',
    '--hex-margin': '5px',
    '--hex-height': 'calc(var(--hex-width) / cos(30deg))',
    '--hex-offset-height':
        'calc(2 * (var(--hex-height) - (var(--hex-height) / 4)))',
})

export const hexagon = css({
    position: 'relative',
    transition: 'all 0.5s ease',
    margin: 'var(--hex-margin)',
    display: 'inline-block',
    height: 'var(--hex-height)',
    width: 'var(--hex-width)',
    aspectRatio: '1 / cos(30deg)',
    clipPath: 'polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)',
    background: 'var(--hex-color)',
    fontSize: 'initial',
    marginBottom: 'calc(-1 * var(--hex-height) / 4 + var(--hex-margin))',
    '& > *': {
        position: 'absolute',
        width: '50%',
        top: '50%',
        left: '50%',
        maxHeight: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        textAlign: 'center',
    },
    _hover: {
        transform: 'scale(1.02)',
        background: 'hsl(from var(--hex-color) h s l / 60%)',
    },
})

export const hexagonGrid = css({
    width: '100%',
    marginBottom: 'calc(var(--hex-height) / 4 )',
    fontSize: 0,
    '&::before': {
        content: '""',
        width: 'calc(var(--hex-width) / 2 + var(--hex-margin))',
        float: 'left',
        height: '120%',
        shapeOutside:
            'repeating-linear-gradient(#0000 0 calc(var(--hex-offset-height) / 2), #fff 0 calc(var(--hex-offset-height) / 2 + 5px), #0000 0 var(--hex-offset-height))',
    },
    '& .hexagon:nth-of-type(3n-1)': {
        '--hex-color': 'grey',
    },
    '& .hexagon:nth-of-type(2n)': {
        '--hex-color': 'teal',
    },
})
