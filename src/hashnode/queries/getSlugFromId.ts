import type { Client } from '@urql/core'
import { graphql } from '../graphql'

const query = graphql(`
    query getPostFromId($id: ID!) {
            post(id: $id) {
                slug  
                url
             
        }
    }
`)

export const getPostByID = (client: Client) => async (id?: string) => {
    if (!id) return undefined

    const result = await client.query(query, { id }).toPromise()
    if (result.error || !result.data?.post) return undefined
    //TODO: These are for types only, consider using different fragment strategy
    return result.data.post
}
