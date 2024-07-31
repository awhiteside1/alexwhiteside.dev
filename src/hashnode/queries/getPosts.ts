import type { Client } from '@urql/core'
import type { ResultOf } from 'gql.tada'
import type { IterableElement } from 'type-fest'
import { graphql } from '../graphql'

const getPostsQuery = graphql(`
    query getPosts {
        publication(host: "alexwhiteside.dev/blog") {
            id
            posts(first: 10) {
                edges {
                    node {
                        id
                        slug
                        coverImage{
                            url
                        }
                        updatedAt
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
    }
`)

export const getPosts = (makeClient: () => Client) => async () => {
    const client = makeClient()
    const result = await client.query(getPostsQuery, {}).toPromise()
    const posts = result.data?.publication?.posts.edges ?? []
    return posts.map((post) => post.node)
}

type Result = ResultOf<typeof getPostsQuery>
export type PostItem = IterableElement<
    NonNullable<Result['publication']>['posts']['edges']
>['node']
