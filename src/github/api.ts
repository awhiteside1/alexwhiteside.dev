const username = 'awhiteside1';
const token = process.env.GITHUB;
import type { Repository } from './types';

export const fetchStarredRepos = async () => {
    const url = `https://api.github.com/users/${username}/starred`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Basic ${btoa(`${username}:${token}`)}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch starred repositories: ${response.status}`);
        }
        const starredRepos: Array<Repository> = await response.json();
       return starredRepos
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
    return []
};