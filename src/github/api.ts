import { sleep, toInt } from 'radash'
import { parseLinkHeader } from './parseLink'
import type { Repository } from './types'

const username = 'awhiteside1'
const token = process.env.GITHUB

interface Topic {
    display_name: string
    short_description: string
    description: string
    name: string
}

export const fetchTopicDetails = async (topic: string): Promise<Topic | undefined> => {
    const url = encodeURI(`https://api.github.com/search/topics?q=${topic}&limit=1`)

    try {
        const response = await fetch(url, {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Basic ${btoa(`${username}:${token}`)}`,
            },
        })

        if (toInt(response.headers.get('x-ratelimit-remaining')) < 5) {
            console.log('API rate limit almost exceeded, sleeping for 5 seconds')
            await sleep(5000)
        }

        if (!response.ok) {
            if (toInt(response.headers.get('x-ratelimit-remaining')) < 1) {
                console.log('API rate limit  exceeded, sleeping until reset')
                const resetTime = toInt(response.headers.get('x-ratelimit-reset'))
                await sleep(resetTime * 1000 - Date.now() + 500)
                console.log('API rate limit reset, continuing')
                return fetchTopicDetails(topic)
            } else {
                throw new Error(
                    `Failed to fetch topic details: ${response.status}, ${JSON.stringify(Object.fromEntries(response.headers.entries()))}`
                )
            }
        }

        const data = (await response.json()) as { items: Topic[] }
        return data.items.find((t) => t.name === topic.toLowerCase())
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message)
        } else {
            console.error('An unknown error occurred')
        }
    }
    return undefined
}

export const fetchStarredRepos = async (
    page = 1
): Promise<{ links: ReturnType<typeof parseLinkHeader>; data: Array<Repository> }> => {
    const url = `https://api.github.com/users/${username}/starred?page=${page}`

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Basic ${btoa(`${username}:${token}`)}`,
                Accept: 'application/vnd.github.v3+json',
            },
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch starred repositories: ${response.status}`)
        }
        const parsed = parseLinkHeader(response.headers)
        const starredRepos: Array<Repository> = await response.json()
        return {
            data: starredRepos,
            links: parsed,
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message)
        } else {
            console.error('An unknown error occurred')
        }
    }
    return { data: [], links: {} }
}
