import tailwindForms from '@tailwindcss/forms'
import typographyPlugin from '@tailwindcss/typography'
import svgToDataUri from 'mini-svg-data-uri'
import defaultTheme from 'tailwindcss/defaultTheme'

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
			backgroundImage: {
				radial: 'radial-gradient(var(--tw-gradient-stops))',
				'radial-right':
					'radial-gradient(circle at 100%, var(--tw-gradient-stops))',
			},
			fontFamily: {
				sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
				concourse: ['Concourse', ...defaultTheme.fontFamily.sans],
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
			dropShadow: {
				glow: [
					'0 0px 20px rgba(255,255, 255, 0.35)',
					'0 0px 65px rgba(255, 255,255, 0.2)',
				],
			},
			rotate: {
				45: '45deg',
				135: '135deg',
				225: '225deg',
				315: '315deg',
			},
			animation: {
				ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
				gradient: 'animated-gradient 10s ease-in-out infinite alternate',

				grid: 'grid 15s linear infinite',
			},
			keyframes: {
				ripple: {
					'0%, 100%': {
						transform: 'translate(-50%, -50%) scale(1)',
					},
					'50%': {
						transform: 'translate(-50%, -50%) scale(0.9)',
					},
				},
				grid: {
					'0%': { transform: 'translateY(-50%)' },
					'100%': { transform: 'translateY(-10%)' },
				},
				'animated-gradient': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
			},
		},
	},
	plugins: [
		tailwindForms,
		require('@tailwind-plugin/expose-colors')({
			extract: ['sky', 'emerald', 'orange'],
		}),
		typographyPlugin,
		({ matchUtilities, theme }) => {
			matchUtilities(
				{
					'bg-grid': (value) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
						)}")`,
					}),
					'bg-grid-small': (value) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
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
