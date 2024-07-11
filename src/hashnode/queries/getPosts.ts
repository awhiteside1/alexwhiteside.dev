import {type FragmentOf, graphql} from '../graphql'
import type {Client} from '@urql/core'

const commentFragment = graphql(`
fragment comment on Comment{
    content {
        html
    }
    id
    author {
        name
        id
        profilePicture
    }
    dateAdded
    totalReactions
}
`)

export const postDetails = graphql(`fragment PostDetails on Post {
    
    slug
    publishedAt
    readTimeInMinutes
    canonicalUrl
    title
    subtitle
    brief
    tags {
        name
        slug
    }
    url
    reactionCount
    
}`)

export const postContent = graphql(`fragment PostContent on Post{
    content {
        html
    }
}`)

const getPostsQuery = graphql(
	`query getPosts{
    publication(host: "alexwhiteside.dev/blog") {
        posts(first: 10) {
            edges {
                node {
                    slug
                    publishedAt
                    readTimeInMinutes
                    canonicalUrl
                    title
                    subtitle
                    brief
                    tags {
                        name
                        slug
                    }
                    url
                    reactionCount
                }
            }
        }
    }
}`,
	[commentFragment, postDetails],
)

export type PostDetail = Readonly<FragmentOf<typeof postDetails>>
export async function getPosts(this: Client) {
	const result = await this.query(getPostsQuery, {}).toPromise()
	const posts = result.data?.publication?.posts.edges ?? []
	return posts.map((post) => post.node)
}

export async function getPost(this: Client, slug?: string) {
    if(!slug) return undefined

	const result = await this.query(
		graphql(
			`query getPost($slug: String!){
        publication(host: "alexwhiteside.dev/blog") {
            post(slug: $slug) {

                slug
                publishedAt
                readTimeInMinutes
                canonicalUrl
                title
                subtitle
                brief
                tags {
                    name
                    slug
                }
                url
                reactionCount
                content {
                    html
                }
            }
        }
    }`
		),
		{ slug },
	).toPromise()
	if (result.error || !result.data?.publication?.post) return undefined
	//TODO: These are for types only, consider using different fragment strategy
    return  result.data.publication.post

}


