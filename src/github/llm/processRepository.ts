import { Float32 } from '@apache-arrow/esnext-esm'
import { makeArrowTable } from '@lancedb/lancedb'
import { byString } from '../../ui/utils/interval.tsx'
import type { RepoPartial } from '../getRepos.ts'
import { init } from './schema.ts'

let tables: Awaited<ReturnType<typeof init>>

export const processRepository = async (repo: RepoPartial) => {
    if (!tables) {
        tables = await init()
    }
    //Check existing values
    const exists = await tables.repositories.query().where(`id = ${repo.id}`).limit(1).toArray()
    if (exists.length === 1) {
        return exists[0]
    }

    // Insert new record into repositories table
    const newRepoRecord = await tables.repositories.add([
        {
            id: repo.id,
            name: repo.name,
            url: repo.url,
            json: JSON.stringify(repo),
            description: repo.description || '',
            language: repo.language || '',
            topics: JSON.stringify(repo.topics || []),
        },
    ])

    // Process and add topics to the topics table
    if (repo.topics && repo.topics.length > 0) {
        const topicsToAdd = repo.topics.map((topic) => ({
            text: topic,
            repository: repo.id,
        }))
        await tables.topics.add(topicsToAdd)
    }

    return newRepoRecord
}

export const addCompressedData = async (data: { embedding: number[]; original: string; repos: Array<string> }[]) => {
    if (!tables) {
        tables = await init()
    }

    const table = makeArrowTable(data, { vectorColumns: { embedding: { type: new Float32() } } })
    return tables.db.createTable('cache', table, { mode: 'overwrite' })
}

export const summarizeData = async () => {
    if (!tables) {
        tables = await init()
    }
    const repos = (await tables.repositories.toArrow()).toArray().sort(byString((x) => x.name))
    summarizeTable('topics', repos)

    const topics = (await tables.topics.toArrow()).toArray().sort(byString((x) => x.text))
    summarizeTable('topics', topics)
}

const summarizeTable = (name: string, data: unknown[]) => {
    console.log(`${name}----------------[${data.length} Rows]`)
    console.table([...data.slice(0, 5)])
    console.log(`---${data.length - 10} additional ${name} ---`)
    console.table([...data.slice(-5)])
    console.log('\n\n=======================\n\n')
}

export const findRelatedRepos = async (query: string) => {
    if (!tables) {
        tables = await init()
    }

    const topics = await tables.topics.search(query).postfilter().select(['text']).limit(15).toArrow()
    //const matchTags = topics.toArray().flatMap((topic) => topic.toJSON())
    // Extracting the columns
    //const tagsColumn = await tables.repositories.query().select(['topics', 'id']).toArrow()
    const matchTagsColumn = topics.select(['text'])

    // Create a set of the match tags for faster lookup
    const matchTagsSet = new Set(matchTagsColumn.toArray())
    topics.batches

    // Filter the table
    const filteredTable = tables.repositories
        .query()
        .where(`id in ${JSON.stringify(matchTagsSet)}`)
        .toArray()
    return filteredTable
}
