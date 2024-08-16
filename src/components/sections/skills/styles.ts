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

export const hexagon = css({
    position: 'relative',
    margin: 'var(--hex-margin)',
    display: 'inline-block',
    transformStyle: 'preserve-3d',
    height: 'var(--hex-height)',
    transition: 'all 1s',
    transform: 'scale(1)',
    width: 'var(--hex-width)',
    aspectRatio: '1 / cos(30deg)',
    clipPath: 'polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)',
    background: 'var(--hex-color)',
    fontSize: 'initial',
    marginBottom: 'calc(-1 * var(--hex-height) / 4 + var(--hex-margin))',
    _hover: {},
})

export const hexagonBack = css({
    backfaceVisibility: 'hidden',
    position: 'absolute',
    inset: 0,
    background: 'hsl(from var(--hex-color) h s 50% / 60%)',
    transform: 'scale(0.8)',
    opacity: 1,
    transition: 'all 1s',
    clipPath: 'polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)',
    _groupHover: {
        transform: 'scale(1)',
    },
    '& > *': {
        position: 'absolute',
        width: '50%',
        top: '50%',
        left: '50%',
        maxHeight: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        textAlign: 'center',
    },
})

export const hexagonFront = css({
    backfaceVisibility: 'hidden',
    position: 'absolute',
    inset: 0,

    padding: 'calc(var(--hex-height) / 6) 0',
    background: 'hsl(from var(--hex-color) h s 50% / 60%)',
    opacity: 1,
    transition: 'all 0.5s ease-in',
    //clipPath: 'polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)',
    _groupHover: {
        top: '70%',
        padding: 0,
        //        opacity: 0,
        // background: 'hsl(from var(--hex-color) h s 50% / 60%)',
        // background: 'red',
    },
})
export const hexFrontContainer = css({
    display: 'flex',
    flexDir: 'column',
    height: '100%',
    w: '100%',
    mx: 'auto',
    justifyContent: 'center',
    gap: 3,
    alignItems: 'center',
    transition: 'all 0.5s',
    _groupHover: {
        height: '80%',
        gap: 0,
        justifyContent: 'center',
        width: '60%',
        // justifyContent: 'start',
    },
})

export const hexIcon = css({
    transition: 'all 0.5s ',
    height: 'calc(var(--hex-height)/3)',
    transform: 'translateY(0)',
    aspectRatio: '1',
    opacity: 1,
    _groupHover: {
        height: 'calc(100% - var(--hex-height)/4)',
        opacity: 0,
        transform: 'translateY(-10px)',
    },
})
