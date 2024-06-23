import { graphql } from 'gql.tada'
import type { Client } from '@urql/core'

const getPostsQuery = graphql(`query getPosts{
    publication(host: "blog.alexwhiteside.dev") {
        posts(first: 10) {
            edges {
                node {
                    publishedAt
                    tags {
                        name
                        slug
                    }
                    title
                   slug
                    id
                }
            }
        }
    }
}`)

export async function getPosts(this: Client) {
	const result = await this.query(getPostsQuery, {}).toPromise()
	const posts = result.data?.publication?.posts.edges ?? []
	return posts.map((post) => post.node)
}
