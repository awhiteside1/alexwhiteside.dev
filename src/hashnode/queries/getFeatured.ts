import type { Client } from '@urql/core'
import { requirePublication, unwrap } from '../client'
import { graphql } from '../graphql'

const getFeaturedQuery = graphql(`{
  publication(host: "alexwhiteside.dev/blog") {
    series(slug: "featured") {
      posts(first: 4) {
        edges {
          node {
            id
            slug
            title
            subtitle
            url
          }
        }
      }
    }
  }
}`)

export const getFeatured = (makeClient: () => Client) => async () => {
	const client = makeClient()
	const result = await client.query(getFeaturedQuery, {}).toPromise()
	const data = unwrap(result, 'getFeatured')
	const publication = requirePublication(data.publication, 'getFeatured')
	// An empty or missing series is a content state, not a failure.
	const posts = publication.series?.posts.edges ?? []
	return posts.map((post) => post.node)
}

export type FeaturedPost = Awaited<
	ReturnType<ReturnType<typeof getFeatured>>
>[number]
