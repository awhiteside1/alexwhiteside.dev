import { getCollection } from 'astro:content'
import { first, group, last, mapValues, sift } from 'radash'
import { byDate } from '@ui/utils/interval.tsx'

export const getWorkContent = async () => {
    const allWork = await getCollection('work')
    const grouped = group(allWork, (w) => w.data.company)
    const byCompany = mapValues(
        grouped,
        (group) =>
            group && {
                roles: group?.toSorted(byDate((role) => role.data.from)),
                company: first(sift(group.map((x) => x.data.company))),
                logo: first(sift(group.map((x) => x.data.logo))),
                from: first(group.map((x) => x.data.from).toSorted()),
                to: last(group.map((x) => x.data.to).toSorted()),
            }
    )

    return byCompany
}
