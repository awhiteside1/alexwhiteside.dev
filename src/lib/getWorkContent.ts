import { type CollectionEntry, getCollection } from 'astro:content'
import { byDate } from '@ui/utils/interval.tsx'
import { first, group, last, mapValues, sift } from 'radash'

type Work = CollectionEntry<'work'>

type GroupedEntry = {
	roles: Array<Work>
	company: string
	logo: string
	acquired?: string
	from: Date
	to: Date
}

export const getWorkContent = async () => {
	const allWork = await getCollection('work')
	return processWorkContent(allWork)
}

export const processWorkContent = (allWork: Array<Work>) => {
	const grouped = group(allWork, (w) => w.data.company)
	const byCompany = mapValues(
		grouped,
		(group) =>
			group && {
				roles: group?.toSorted(byDate((role) => role.data.from)),
				company: first(sift(group.map((x) => x.data.company))),
				logo: first(sift(group.map((x) => x.data.logo))),
				acquired: first(sift(group.map((x) => x.data.acquired))),
				from: first(
					group
						.toSorted(byDate((role) => role.data.from, false))
						.map((x) => x.data.from),
				),
				to: last(
					group
						.toSorted(byDate((role) => role.data.to, false))
						.map((x) => x.data.to),
				),
			},
	)

	const map = new Map(Object.entries(byCompany)) as Map<string, GroupedEntry>
	return {
		map,
		getByCompany: (company: string) => {
			const result = map.get(company)
			if (result) return result
			throw new Error('Not Found')
		},
	}
}
