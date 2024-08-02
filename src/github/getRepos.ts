import fs from 'node:fs'
import { byNumber } from "@ui/utils/interval"
import { group, listify, toInt } from "radash"
import { fetchStarredRepos } from "./api"
import type { Repository } from "./types"


const getStarredRepos=async()=>{

    const repos = new Array<Repository>()
    let response = await fetchStarredRepos()
    do {
        repos.push(...response.data)
        const page = toInt(response.links.next.page)
        response = await fetchStarredRepos(page)
    
    }while ("next" in response.links) 

    const data =  repos.map(({url, name, full_name, stargazers_count, description, language, topics, pushed_at, updated_at,id }) => ({url, name, full_name, stargazers_count, description, language, topics, pushed_at, updated_at,id}))
    return data
}

export type RepoPartial = Awaited<ReturnType<typeof getStarredRepos>>[number]


const getCachedRepos = async(): ReturnType<typeof getStarredRepos>=>{

    const cache = await import('./cache')
    if(cache.repos){
        return cache.repos
    }
    if(fs.existsSync("repos.json")){
        const data = fs.readFileSync("repos.json", "utf-8")
        return JSON.parse(data)
    }

    const repos = await getStarredRepos()
    fs.writeFileSync("repos.json", JSON.stringify(repos))
    return repos
}



export const getStarredReposByLanguage=async()=>{
    const repos = await getCachedRepos()
    const byLang = group(repos, r=>r.language)
    const asArray = listify(byLang, (key, value)=> ({language: key, repos: value??[], count: value?.length??0}))
    return asArray.toSorted(byNumber(x=>x.count, true))
}