import { client } from './client'
import { getPost, getPosts } from './queries'
import { getPostByID } from './queries'

export const Hashnode = {
    getPosts: getPosts(client),
    getPostByID: getPostByID(client),
    getPost: getPost(client),
}
