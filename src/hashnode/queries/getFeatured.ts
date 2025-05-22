import type { Client } from '@urql/core'
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
	const posts = result.data?.publication?.series?.posts.edges ?? []
	return posts.map((post) => post.node)
}

export type FeaturedPost = Awaited<
	ReturnType<ReturnType<typeof getFeatured>>
>[number]
