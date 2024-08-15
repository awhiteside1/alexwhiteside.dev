import { type CollectionEntry, getCollection } from 'astro:content'
import { objectify } from 'radash'

type SkillData = CollectionEntry<'skills'>['data']

type Skill = SkillData & {
    id: string
}

export const getSkills = async () => {
    const skills = await getCollection('skills')
    return objectify(
        skills,
        (skill) => skill.id,
        (skill) => ({ id: skill.id, ...skill.data })
    )
}
