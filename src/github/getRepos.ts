import fs from 'node:fs'
import { group, listify, toInt } from "radash"
import { byNumber } from "../ui/utils/interval"
import { fetchStarredRepos } from "./api"
import type { Repository } from "./types"


export const getStarredRepos = async (all = true) => {

    const repos = new Array<Repository>()
    let response = await fetchStarredRepos()
    do {
        repos.push(...response.data)
        const page = toInt(response.links.next.page)
        response = await fetchStarredRepos(page)
        console.log("Fetching page", page)

    } while ("next" in response.links && all)

    const data = repos.map(({ url, name, full_name, stargazers_count, description, html_url, language, topics, pushed_at, updated_at, id, homepage, default_branch }) => ({ url, name, html_url, homepage, full_name, stargazers_count, description, language, topics, pushed_at, updated_at, id, readme_url: `https://raw.githubusercontent.com/${full_name}/${default_branch}/README.md` }))
    return data
}

export type RepoPartial = Awaited<ReturnType<typeof getStarredRepos>>[number]


const getCachedRepos = async (): ReturnType<typeof getStarredRepos> => {

    try {
        const cache = await import('./cache')
        if (cache.repos) {
            return cache.repos
        }
        if (fs.existsSync("repos.json")) {
            const data = fs.readFileSync("repos.json", "utf-8")
            return JSON.parse(data)
        }
    } catch (e) {
        console.error(e)
    }
    console.log("Fetching repos")
    const repos = await getStarredRepos()
    fs.writeFileSync("repos.json", JSON.stringify(repos))
    return repos
}



export const getStarredReposByLanguage = async () => {
    const repos = await getCachedRepos()
    const byLang = group(repos, r => r.language)
    const asArray = listify(byLang, (key, value) => ({ language: key, repos: value ?? [], count: value?.length ?? 0 }))
    return asArray.toSorted(byNumber(x => x.count, true))
}