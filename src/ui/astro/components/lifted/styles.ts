import { defineStyles } from '@pandacss/dev'
import { css, cva } from '@styles/css'
import type { CssVarKeys, CssVarValue } from '@styles/types'
import { dash } from 'radash'

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

	minHeight: '100px',
	aspectRatio: '1',
	display: 'flex',
	justifyContent: 'center',
})

export const palette = css({
	'--lifted-color-top': 'hsl(from var(--bg-color-main) h s 85%  / 100%)',
	_dark: {
		'--lifted-color-top': 'hsl(from var(--bg-color-main) h s 30%  / 100%)',
	},
	width: '100%',
	height: '100%',
	position: 'relative',
	display: 'inline-block',
	perspective: '800px',
})

const paletteCoverBase = {
	cursor: 'default',

	backgroundColor: 'var(--bg-color-main)',
	borderRadius: '0.5rem',
	position: 'absolute',
	width: 'inherit',
	transform: 'translateZ(1px)',
	transition: 'all',
	transitionDuration: '0.7s',
	transitionTimingFunction: 'ease-in-out',
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
		transform: 'rotateX(85deg) translateY(-5px) translateZ(0px)',
	},
}

export const paletteCover = cva({
	base: paletteCoverBase,
	variants: {
		lift: {
			low: {
				_groupHover: {
					transform: 'rotateX(75deg)',
				},
			},
			tight: {
				_groupHover: {
					transform: 'rotateX(87deg)',
				},
			},
			full: {
				_groupHover: {
					transform: 'rotateX(93deg)',
				},
			},
		},
	},
})

export const paletteBase = css({
	backgroundColor: 'var(--lifted-color-inner)',
	boxShadow: 'inset 2px 5px 10px -2px rgba(0, 0, 0, 0.2)',
	width: 'inherit',
	height: 'inherit',
	position: 'absolute',
	top: 0,
	borderRadius: '0.5rem',
	overflow: 'hidden',
})
