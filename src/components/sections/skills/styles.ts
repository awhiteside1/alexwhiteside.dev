import { css } from '@styles/css'

export const hexagonContainer = css({
    display: 'flex',
    position: 'relative',
    // left: 'calc( -0.5 * var(--hex-width))',
    '--hex-color': '#f3f3f3',
    '--hex-width': '150px',
    '--hex-margin': '5px',
    '--hex-height': 'calc(var(--hex-width) / cos(30deg))',
    '--hex-clip-path':
        'polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)',
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
})

export const hexagon = css({
    '--hex-color-desaturated':
        'color-mix(in oklab, oklch(from var(--hex-color) 0.6 .2 h) 30%, var(--color-page) 70% )',
    '--hex-color-saturated':
        'color-mix(in oklab, oklch(from var(--hex-color) 0.6 .2 h) 50%, var(--color-page) 50% )',
    position: 'relative',
    margin: 'var(--hex-margin)',
    display: 'inline-block',
    transformStyle: 'preserve-3d',
    height: 'var(--hex-height)',
    transition: 'all 1s',
    transform: 'scale(1)',
    width: 'var(--hex-width)',
    aspectRatio: '1 / cos(30deg)',
    clipPath: 'var(--hex-clip-path)',
    background: 'var(--color-page)',
    fontSize: 'initial',
    marginBottom: 'calc(-1 * var(--hex-height) / 4 + var(--hex-margin))',
    '--hex-color-gradient':
        'linear-gradient(to top, var(--hex-color-desaturated) 0%,  var(--color-page) 40% )',
    _hover: {},
})

export const hexagonBack = css({
    position: 'absolute',
    inset: 0,
    background: 'var(--color-page)',
    color: 'var(--color-page-foreground)',
    opacity: 0,
    transition: 'all 1s',
    clipPath: 'var(--hex-clip-path)',
    padding: 'calc(var(--hex-height) / 4) calc(var(--hex-width) / 8)',
    _groupHover: {
        opacity: 1,
    },
    '& > *': {
        lineHeight: 1,
        fontSize: 'smaller',
    },
})

export const hexagonFront = css({
    backfaceVisibility: 'hidden',
    position: 'absolute',
    inset: 0,

    padding: 'calc(var(--hex-height) / 6) 0',
    background: 'var(--hex-color-gradient)',
    opacity: 1,
    transition: 'all 0.5s ease-in',
    _groupHover: {
        '--hex-color-gradient':
            'linear-gradient(to top, var(--hex-color-saturated) 10%,  var(--color-page) 40% )',
        top: '65%',
        padding: '4px 0 10px 0 ',
    },
})
export const hexFrontContainer = css({
    display: 'flex',
    flexDir: 'column',
    height: '100%',
    w: '80%',
    mx: 'auto',
    justifyContent: 'center',
    gap: 3,
    alignItems: 'center',
    transition: 'all 0.5s',
    _groupHover: {
        height: '80%',
        gap: 0,
        justifyContent: 'center',
        width: '70%',
        // justifyContent: 'start',
    },
})

export const hexIcon = css({
    transition: 'all 0.5s ',
    color: 'var(--color-page-foreground)',
    height: 'calc(var(--hex-height)/4)',
    transform: 'translateY(0)',
    aspectRatio: '1',
    opacity: 1,
    _groupHover: {
        height: 'calc(100% - var(--hex-height)/4)',
        opacity: 0,
        transform: 'translateY(-10px)',
    },
})
