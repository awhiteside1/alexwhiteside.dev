const username = 'awhiteside1'
// Vercel provisions this as GITHUB_TOKEN; keep GITHUB working for local shells.
const token = process.env.GITHUB ?? process.env.GITHUB_TOKEN

import { parseLinkHeader } from './parseLink'
import type { Repository } from './types'

export const fetchStarredRepos = async (
	page = 1,
): Promise<{
	links: ReturnType<typeof parseLinkHeader>
	data: Array<Repository>
}> => {
	const url = `https://api.github.com/users/${username}/starred?page=${page}`

	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `Basic ${btoa(`${username}:${token}`)}`,
				Accept: 'application/vnd.github.v3+json',
			},
		})

		if (!response.ok) {
			throw new Error(
				`Failed to fetch starred repositories: ${response.status}`,
			)
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
