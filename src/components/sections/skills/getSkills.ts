import { type CollectionEntry, getCollection } from 'astro:content'
import { objectify } from 'radash'

type SkillData = CollectionEntry<'skills'>['data'] & CollectionEntry<'skills'>
export const getSkills = async (): Promise<Record<string, SkillData>> => {
	const skills = await getCollection('skills')
	const obj = objectify(
		skills,
		(skill) => skill.id.replaceAll('.mdx', ''),
		(skill) => ({ ...skill, ...skill.data }),
	)
	return obj
}
