import type {CollectionEntry, CollectionKey} from 'astro:content'

export type CollectionFilter = <T extends CollectionKey>(
    entry: CollectionEntry<T>,
) => boolean

export const filterDrafts: CollectionFilter = ({ data }) => {
	return import.meta.env.PROD ? "draft" in data && data.draft !== true : true
}

export const filterByPath =
    (path: string): CollectionFilter =>
        ({id}) => {
            return id.startsWith(path)
        }

export const filterFeatured: CollectionFilter = ({data}) => {
    return "featured" in data && data?.featured === true

}

/**
 * Invokes each filter, requiring all to pass
 * @param filters
 */
export const combineFilters =
    (...filters: CollectionFilter[]): CollectionFilter =>
        (entry) => {
            return filters.every((filter) => filter(entry))
        }
