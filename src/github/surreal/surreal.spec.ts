import { parallel } from 'radash'
import type { Surreal } from 'surrealdb.js'
import { beforeAll, describe, it } from 'vitest'
import { getStarredRepos } from '../getRepos.ts'
import { createDb } from './init.ts'
import { insertRepository } from './insert.ts'
import { initSchema } from './schemas.ts'

describe('Surreal', () => {
	let db: Surreal
	beforeAll(async () => {
		db = await createDb()
	})
	it('should ', async () => {
		await initSchema(db)
		const repos = await getStarredRepos()
		await parallel(3, repos, (repo) => insertRepository(db, repo))
		//         const embedding = new OllamaEmbeddings()
		//         const embeddingResult = await embedding.computeQueryEmbeddings('visual styles')
		//
		//         const repos = await  fetchReposByTopicIntent(db, embeddingResult)
		// console.log(repos)
	})
})
