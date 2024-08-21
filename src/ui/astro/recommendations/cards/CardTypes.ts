import type { CollectionEntry } from 'astro:content'
import { undefined } from 'zod'

export type CardTypeOptions = {
	imageGenerationFn: (entry: CollectionEntry<'awesome'>) => string
	showTitle: boolean
}

const defaultOptions: CardTypeOptions = {
	imageGenerationFn: () => 'https://placehold.co/300x500',
	showTitle: true,
}

export type CardKinds = 'blogs' | 'talks' | 'books'
export const CardTypes: Record<CardKinds, CardTypeOptions> = {
	blogs: defaultOptions,
	books: { ...defaultOptions, showTitle: false },
	talks: {
		showTitle: true,
		imageGenerationFn: (entry) =>
			`https://i.ytimg.com/vi/${new URL(entry.data.url).pathname.replaceAll('/', '')}/hqdefault.jpg`,
	},
}
