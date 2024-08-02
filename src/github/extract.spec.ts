
import { describe, expect, it } from 'vitest'
import { getStarredRepos } from './getRepos'
import { findRelatedRepos, processRepository, summarizeData } from './llm/processRepository'
describe('extract', () => {
  it('should create a table', async () => {

    const repos = await getStarredRepos(false)
    for (const repo of repos) {
      await processRepository(repo)
    }
    await summarizeData()

  }, { timeout: 100000000 })


  it('should find related repos', async () => {
    const repos = await findRelatedRepos('react')
    console.table(repos)
  })
})