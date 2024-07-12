import svgToDataUri from 'mini-svg-data-uri'
import defaultTheme from 'tailwindcss/defaultTheme'

import typographyPlugin from '@tailwindcss/typography'

const flattenColorPalette = (colors) =>
	Object.assign(
		{},
		...Object.entries(
			colors !== null && colors !== void 0 ? colors : {},
		).flatMap(([color, values]) =>
			typeof values === 'object'
				? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
						[color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex,
					}))
				: [
						{
							[`${color}`]: values,
						},
					],
		),
	)

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Atkinson', ...defaultTheme.fontFamily.sans],
			},
			backgroundSize: {
				'300%': '300%',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'full',
					},
				},
			},
			rotate: {
				45: '45deg',
				135: '135deg',
				225: '225deg',
				315: '315deg',
			},
			animation: {
				gradient: 'animated-gradient 10s ease-in-out infinite alternate',
			},
			keyframes: {
				'animated-gradient': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
			},
		},
	},
	plugins: [
		typographyPlugin,
		({ matchUtilities, theme }) => {
			matchUtilities(
				{
					'bg-grid': (value) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
						)}")`,
					}),
					'bg-grid-small': (value) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
						)}")`,
					}),
					'bg-dot': (value) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
						)}")`,
					}),
				},
				{
					values: flattenColorPalette(theme('backgroundColor')),
					type: 'color',
				},
			)
		},
	],
}

// // This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
// function addVariablesForColors({ addBase, theme }) {
// 	let allColors = flattenColorPalette(theme("colors"));
// 	let newVars = Object.fromEntries(
// 		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
// 	);
//
// 	addBase({
// 		":root": newVars,
// 	});
// }
