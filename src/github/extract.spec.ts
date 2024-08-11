import { describe, it } from 'vitest'
import { getStarredRepos } from './getRepos'
import { OllamaEmbeddings } from './llm/Ollama.ts'
import { connectToDB } from './llm/init.ts'
import { processRepository, summarizeData } from './llm/processRepository'

describe('extract', () => {
	it('should create a table', async () => {
		const repos = await getStarredRepos(false)
		for (const repo of repos) {
			await processRepository(repo)
		}
		await summarizeData()
	})

	it('should find related repos', async () => {
		const embedding = await new OllamaEmbeddings().computeQueryEmbeddings('css')
		//const         db = await createDb()
		//const response = await fetchReposByTopicAll(db) as Array<Record<string, any>>
		// @ts-ignore
		const connection = await connectToDB('s3://alexwhitesidedev')
		const t = await connection.tableNames()
		console.log(t)
		const table = await connection.openTable('cache')

		//   await table.optimize()
		const t2 = await table
			.query()
			.nearestTo(embedding)
			.column('embedding')
			.distanceType('cosine')
			.limit(5)
			.select(['repos', 'original'])
			.bypassVectorIndex()
			.toArray()
		console.log(t2)
		//const repos = await findRelatedRepos('react')
		//console.table(repos)
	})
})
