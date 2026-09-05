import type { Client } from '@urql/core'
import { isNotFound, requirePublication, unwrap } from '../client'
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
	// A missing post is a real 404, not an outage.
	if (isNotFound(result)) return undefined

	const data = unwrap(result, `getPost(${slug})`)
	const publication = requirePublication(data.publication, 'getPost')
	return publication.post ?? undefined
}
