import { makeClient } from './client'
import { getFeatured, getPost, getPostByID, getPosts } from './queries'

export const Hashnode = {
	getPosts: getPosts(makeClient),
	getPostByID: getPostByID(makeClient),
	getPost: getPost(makeClient),
	getFeatured: getFeatured(makeClient),
}
