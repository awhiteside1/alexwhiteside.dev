import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { repositories, repository_topic, topics } from './schema.ts'
import { parallel, unique } from 'radash'
import { and, eq, isNotNull, isNull } from 'drizzle-orm'
import { OllamaEmbeddings } from '@github/llm/Ollama.ts'
import type { Repository } from '@github/types.ts'
import { fetchTopicDetails } from '@github/api.ts'
import { Ollama } from 'ollama'
import consola from 'consola'

export const turso = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
})

const MODEL = 'llama3.1:70b'

const drizzleClient = drizzle(turso)
const llm = new OllamaEmbeddings()
const descriptionLLM = new Ollama({})

const clock = {
    start: performance.now(),
    tasks: new Map<string, { start: number; end?: number }>(),
}

let llmWarm = false

const warmUpLLM = async () => {
    if (llmWarm) return
    consola.start('Warming LLM up...')
    await descriptionLLM.generate({ model: MODEL, prompt: 'Hello' })
    llmWarm = true
    consola.success('LLM Is Ready!')
}

// const starred = await fetchStarredRepos()

const syncData = async (data: Array<Repository>) => {
    const topicData = unique(data.flatMap((star) => star.topics))
    await drizzleClient
        .insert(topics)
        .values(topicData.map((t) => ({ name: t })))
        .onConflictDoNothing()
    await drizzleClient
        .insert(repositories)
        .values(data.map((star) => ({ name: star.full_name, topics: star.topics, githubId: star.id })))
        .onConflictDoNothing()

    const repoTopics = data.flatMap((star) =>
        star.topics.map((topic) => ({
            repository: star.full_name,
            topic: topic,
        }))
    )

    await drizzleClient.insert(repository_topic).values(repoTopics)
}

const syncTopics = async () => {
    const missingTopicDetails = await drizzleClient
        .select({ topic: topics.name })
        .from(topics)
        .where(isNull(topics.description))

    await parallel(1, missingTopicDetails, async ({ topic }) => {
        const details = await fetchTopicDetails(topic)
        if (details != undefined && details?.display_name != undefined) {
            const summary = `${details?.name} (${details?.display_name}):\n ${details?.description ?? details?.short_description ?? ''}`
            await drizzleClient.update(topics).set({ description: summary }).where(eq(topics.name, topic))
        }
    })
}

const generateDescriptions = async () => {
    const missingTopicDetails = await drizzleClient
        .select({ topic: topics.name })
        .from(topics)
        .where(isNull(topics.description))

    const descriptions = await parallel(5, missingTopicDetails, async ({ topic }) => {
        clock.tasks.set(topic, { start: performance.now() })
        const output = await descriptionLLM.generate({
            model: MODEL,
            prompt: `Expand the following github topic into a sentence description. Do not respond with anything other than the description sentence.  \n\n TOPIC: '${topic}' `,
        })
        const response = output.response
        await drizzleClient.update(topics).set({ description: response }).where(eq(topics.name, topic))
        const task = clock.tasks.get(topic)
        if (task) {
            task.end = performance.now()
            console.info(`Added : ${topic} \t\t ${task?.end - task?.start} `)
        }
        return { topic, response }
    })
}

const syncEmeddings = async () => {
    const missingEmbeddings = await drizzleClient
        .select({ description: topics.description, name: topics.name })
        .from(topics)
        .where(and(isNull(topics.embedding), isNotNull(topics.description)))
    const embeddings = await llm.computeSourceEmbeddings(
        missingEmbeddings.map((topic) => topic.description ?? topic.name)
    )
    await Promise.all(
        missingEmbeddings.map(async (topic, index) => {
            await drizzleClient
                .update(topics)
                .set({ embedding: JSON.stringify(embeddings[index]) })
                .where(eq(topics.name, topic.name))
        })
    )
}
const findNearest = async (query: string) => {
    const embedding = await llm.computeQueryEmbeddings(query)
    const result = await turso.execute(
        `SELECT  repository.name as repo, min(vector_distance_cos(topics.embedding, vector('${JSON.stringify(embedding)}'))) as distance from repository join repository_topic rt on rt.repository=repository.name join topics on rt.topic=topics.name group by repository.name order by distance asc`
    )
    console.log(result)
}

//await syncTopics()
//await syncEmeddings()
console.log(await findNearest('finance'))
// await warmUpLLM()
// clock.start = performance.now()
// await generateDescriptions()
// await syncEmeddings()
// const repos = drizzleClient.select().from(repositories)
// console.log(await repos.execute())

consola.info(`Total Time ${performance.now() - clock.start}`)
