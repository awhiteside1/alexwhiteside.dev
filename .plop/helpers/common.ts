import type { NodePlopAPI } from 'plop'

export const setupHelpers = (plop: NodePlopAPI) => {
	plop.setHelper('titleize', (str: string) => {
		return str.replace(
			/\w\S*/g,
			(txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
		)
	})

	plop.setHelper('default', (value: unknown, defaultValue: unknown) => {
		return value ?? defaultValue
	})
}
