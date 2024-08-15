import defu from 'defu'
import { uid } from 'radash'

declare global {
	interface Window {
		astroInitContexts: Map<string, Map<string, unknown>>
	}
}

interface Props {
	pages?: Array<string>
	id?: string
}

export const ensureInit = <T extends Map<string, any>>(
	fn: (document: Document, context: T) => void,
	props?: Props,
) => {
	const propss = defu(props, { id: uid(7) })
	const context = new Map()
	window.astroInitContexts.set(propss.id, context)

	document.addEventListener('astro:page-load', (ev) => {
		const document = window.document
		const pathname = window.location.pathname
		if (propss.pages && !propss.pages.includes(pathname)) {
			console.log('Skipping init for ', pathname)
			return
		}
		const updatedContext = window.astroInitContexts.get(propss.id) as T
		try {
			fn(document, updatedContext)
		} catch (err) {
			console.error(err)
		}
	})
}
