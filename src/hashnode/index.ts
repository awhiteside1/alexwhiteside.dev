import { client } from './client'
import { getPost, getPosts } from './queries'

export const Hashnode = {
    getPosts: getPosts(client),
    getPost: getPost(client),
}
