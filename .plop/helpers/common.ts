// @ts-ignore
import helpers from 'handlebars-helpers'
import type { NodePlopAPI } from 'plop'

export const setupHelpers = (plop: NodePlopAPI) => {
	const desiredHelpers = {
		...helpers.string(),
		...helpers.object(),
		...helpers.comparison(),
	} as Record<string, () => unknown>
	// biome-ignore lint/complexity/noForEach: <explanation>
	Object.entries(desiredHelpers).forEach(([key, value]) =>
		plop.setHelper(key, value),
	)
}
