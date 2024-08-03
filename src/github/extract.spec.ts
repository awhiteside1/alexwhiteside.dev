import {describe, it} from 'vitest'
import {getStarredRepos} from './getRepos'
import {addCompressedData, findRelatedRepos, processRepository, summarizeData} from './llm/processRepository'
import { createDb } from './surreal/init'
import { fetchReposByTopicAll } from './surreal/surql/queries/export'
import {parallel} from "radash";
import {fetchEmbedding} from "../../api/related.ts";
import {connectToDB} from "./llm/init.ts";
import {OllamaEmbeddings} from "./llm/Ollama.ts";
import lancedb from "@lancedb/lancedb";

describe('extract', () => {
  it('should create a table', async () => {

    const repos = await getStarredRepos(false)
    for (const repo of repos) {
      await processRepository(repo)
    }
    await summarizeData()

  }, { timeout: 100000000 })


  it('should find related repos', async () => {

    const embedding=await new OllamaEmbeddings().computeQueryEmbeddings('css')
    //const         db = await createDb()
    //const response = await fetchReposByTopicAll(db) as Array<Record<string, any>>
    // @ts-ignore
  const connection =  (await connectToDB('s3://alexwhitesidedev'))
    const t= await connection.tableNames()
    console.log(t)
    const table = await connection.openTable('cache')

 //   await table.optimize()
    const t2=await table.query().nearestTo(await fetchEmbedding('css')).column('embedding').distanceType('cosine').limit(5).select(['repos', 'original']).bypassVectorIndex().toArray()
    console.log(t2)
    //const repos = await findRelatedRepos('react')
    //console.table(repos)
  },{ timeout: 100000000 })
})