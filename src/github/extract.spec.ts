import fs from 'node:fs'
import { PGlite } from '@electric-sql/pglite'
import { vector } from '@electric-sql/pglite/vector'
import { describe, it } from 'vitest'
import { OllamaEmbeddings } from './llm/Ollama.ts'
import { connectToDB } from './llm/init.ts'
import { summarizeData } from './llm/processRepository'

describe('extract', () => {
	it('should summarize', () => {
		summarizeData()
	})
	it(
		'should create a table',
		async () => {
			const db = new PGlite({
				extensions: { vector },
				dataDir: '/tmp/data',
			})
			// const tables = await init()
			// const cache = await (await tables.db.openTable('cache')).toArrow()
			// await db.exec(CreateSQL)
			// for (const topic of cache.toArray()) {
			// 	await db.query(
			// 		`INSERT INTO topics (embedding, original ) VALUES ('${topic.embedding}', '${topic.original}') ON CONFLICT DO NOTHING `,
			// 	)
			// }
			const embedding = await new OllamaEmbeddings().computeQueryEmbeddings(
				'browser framework frontend',
			)
			const t = await db.query(
				`SELECT 1 - (embedding <=> '[${embedding}]') AS cosine_similarity FROM topics;`,
			)

			const dump = await db.dumpDataDir('none')
			const data = await dump.arrayBuffer()
			fs.writeFileSync('./public/data/dump', Buffer.from(data))
			console.log(t)
		},
		{ timeout: 100000 },
	)

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
