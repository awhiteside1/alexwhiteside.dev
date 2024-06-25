import { client } from './client.ts'
import { getPosts } from './queries/getPosts'

export const Hashnode = {
	getPosts: getPosts.bind(client),
}
