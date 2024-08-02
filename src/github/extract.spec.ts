import { describe, expect, it } from 'vitest'
import { parseLinkHeader } from './parseLink'
import { fetchStarredRepos } from './api'
import type { Repository } from './types'
import { toInt } from 'radash'
import fs from 'node:fs'
describe('extract', () => {
  it('should extract data from the response', async () => {
    const repos = new Array<Repository>()
    let response = await fetchStarredRepos()
    do {
        repos.push(...response.data)
        const page = toInt(response.links.next.page)
        response = await fetchStarredRepos(page)
    
    }while ("next" in response.links) 

    const data =  repos.map(({url, name, full_name, stargazers_count, description, language, topics, pushed_at, updated_at,id }) => ({url, name, full_name, stargazers_count, description, language, topics, pushed_at, updated_at,id}))
    const output = JSON.stringify(data)
    fs.writeFileSync('repos.json', output)



  }, {timeout:100000})
})