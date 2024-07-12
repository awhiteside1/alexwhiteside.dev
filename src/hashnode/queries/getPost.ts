import type {Client} from "@urql/core";
import {graphql} from "../graphql";


const query = graphql(
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
    }`
)


export const   getPost=(client: Client)=> async(slug?: string) =>{
    if(!slug) return undefined

    const result = await client.query(
        query,
        { slug },
    ).toPromise()
    if (result.error || !result.data?.publication?.post) return undefined
    //TODO: These are for types only, consider using different fragment strategy
    return  result.data.publication.post
}
