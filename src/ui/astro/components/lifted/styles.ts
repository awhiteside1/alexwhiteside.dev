import { css } from '@styles/css'
import { dash } from 'radash'
import { defineStyles } from '@pandacss/dev'
import type { CssVarKeys, CssVarValue } from '@styles/types'

class CssVar {
    private readonly name: `--${string}`
    constructor(name: string) {
        this.name = `--${dash(name)}`
    }

    public getName(): CssVarKeys {
        return this.name
    }
    public asVar() {
        return `var(${this.getName()})`
    }
    public set(value: CssVarValue) {
        return {
            [this.getName()]: value,
        } as unknown as astroHTML.JSX.StyleObject
    }

    toString() {
        return this.getName()
    }
}

export const innerColor = new CssVar('lifted-color-inner')
export const coverColor = new CssVar('lifted-color-cover')
const coverTopColor = new CssVar('lifted-color-top')
const colors = defineStyles({
    '--lifted-color-top': 'hsl(from var(--bg-color-main), h s l)',
})

export const paletteWrapper = css({
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
})

export const palette = css(colors, {
    '--lifted-color-top':
        'hsl(from var(--bg-color-main) h calc(s - 1 ) calc( l - 5)  / 100%)',
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'inline-block',
    perspective: '800px',
})

export const paletteCover = css({
    backgroundColor: 'var(--bg-color-main)',
    borderRadius: '6px',
    position: 'absolute',
    width: 'inherit',
    transform: 'translateZ(1px)',
    transition: 'all',
    transitionDuration: '1s',
    border: '1px solid var(--lifted-color-inner)',
    transitionTimingFunction: 'ease-in-out',
    _groupHover: {
        border: '1px solid var(--lifted-color-top)',
        transform: 'rotateX(73deg)',
    },
    transformStyle: 'preserve-3d',
    height: 'inherit',
    top: 0,
    zIndex: 4,
    transformOrigin: 'top left',
    _before: {
        bottom: '0px',
        position: 'absolute',
        left: 0,
        zIndex: 9,
        width: '100%',
        borderRadius: '3px 3px 1px 1px',
        height: '10px',
        content: '""',
        backgroundColor: 'var(--lifted-color-top)',
        transform: 'rotateX(90deg) translateY(-5px) translateZ(0px)',
    },
})

export const paletteBase = css({
    backgroundColor: 'var(--lifted-color-inner)',
    boxShadow: 'inset 2px 5px 10px -2px rgba(0, 0, 0, 0.2)',
    width: 'inherit',
    height: 'inherit',
    position: 'absolute',
    top: 0,
    borderRadius: '8px',
    padding: '15px',
    gap: '8px',
    display: 'flex',
})
