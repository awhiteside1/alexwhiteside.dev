import { makeClient } from './client'
import { getPost, getPosts } from './queries'
import { getPostByID } from './queries'

export const Hashnode = {
	getPosts: getPosts(makeClient),
	getPostByID: getPostByID(makeClient),
	getPost: getPost(makeClient),
}
