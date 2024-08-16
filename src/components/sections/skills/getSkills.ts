import { type CollectionEntry, getCollection } from 'astro:content'
import { objectify } from 'radash'

type SkillData = CollectionEntry<'skills'>['data']

type Skill = SkillData & {
    id: string
}

export const getSkills = async () => {
    const skills = await getCollection('skills')
    const obj = objectify(
        skills,
        (skill) => skill.id.replaceAll('.mdx', ''),
        (skill) => ({ ...skill, ...skill.data })
    )
    console.log(obj)
    return obj
}
