import { css } from '@styles/css'

const aspectRatio = 12 / 6
const bg = (dark = true) => `hsl(237, 89%, ${dark ? '14%' : '60%'})`

export const grid = css({
	_hover: { backgroundColor: 'red' },
	transition: 'all',
	position: 'absolute',
	width: '100px',
	aspectRatio: aspectRatio,
	top: '50%',
	backgroundColor: { _dark: bg(false), _light: bg(true) },
	left: '50%',
	transform: 'translate(-50%, -50%)',
})
