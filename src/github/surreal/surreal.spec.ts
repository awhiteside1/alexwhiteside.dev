import {type Surreal, surql } from 'surrealdb.js'
import { beforeAll, describe, it } from 'vitest'
import { createDb } from './init.ts'
import { initSchema } from './schemas.ts'
import {insertRepository} from "./insert.ts";
import {parallel} from "radash";
import {getStarredRepos} from "../getRepos.ts";
import {fetchReposByTopicIntent} from "./surql/queries/semantic";
import { OllamaEmbeddings } from '../llm/Ollama.ts';
describe('Surreal', () => {
    let db: Surreal
    beforeAll(async () => {
        db = await createDb()
    })
    it('should ', async () => {
        await initSchema(db)
         const repos = await getStarredRepos()
        await parallel(3,repos,repo=> insertRepository(db, repo))
//         const embedding = new OllamaEmbeddings()
//         const embeddingResult = await embedding.computeQueryEmbeddings('visual styles')
//
//         const repos = await  fetchReposByTopicIntent(db, embeddingResult)
// console.log(repos)


    },{timeout:500000})
})
