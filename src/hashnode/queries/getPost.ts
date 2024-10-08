import type { Client } from '@urql/core'
import { graphql } from '../graphql'

const query = graphql(`
    query getPost($slug: String!) {
        publication(host: "alexwhiteside.dev/blog") {
            id
            post(slug: $slug) {
                slug
                id
                publishedAt
                readTimeInMinutes
                canonicalUrl
                coverImage {
                    url
                }
                title
                updatedAt
                subtitle
                brief
                tags {
                    name
                    slug
                }
                url
                reactionCount
                content {
                    markdown
                }
                features {
                    tableOfContents {
                        items {
                            id
                            level
                            slug
                            title
                            parentId
                        }
                    }
                }
            }
        }
    }
`)

export const getPost = (makeClient: () => Client) => async (slug?: string) => {
	if (!slug) return undefined
	const client = makeClient()

	const result = await client.query(query, { slug }).toPromise()
	if (result.error || !result.data?.publication?.post) return undefined
	//TODO: These are for types only, consider using different fragment strategy
	return result.data.publication.post
}
