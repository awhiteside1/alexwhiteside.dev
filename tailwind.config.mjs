import defaultTheme from "tailwindcss/defaultTheme";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Atkinson", ...defaultTheme.fontFamily.sans],
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: "full",
					},
				},
			},
			rotate: {
				45: "45deg",
				135: "135deg",
				225: "225deg",
				315: "315deg",
			},
			animation: {
				twinkle: "twinkle 2s ease-in-out forwards",
				meteor: "meteor 3s ease-in-out forwards",
			},
			keyframes: {
				twinkle: {
					"0%": {
						opacity: 0,
						transform: "rotate(0deg)",
					},
					"50%": {
						opacity: 1,
						transform: "rotate(180deg)",
					},
					"100%": {
						opacity: 0,
						transform: "rotate(360deg)",
					},
				},
				meteor: {
					"0%": {
						opacity: 0,
						transform: "translateY(200%)",
					},
					"50%": {
						opacity: 1,
					},
					"100%": {
						opacity: 0,
						transform: "translateY(0)",
					},
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography"),addVariablesForColors],
};




// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}
