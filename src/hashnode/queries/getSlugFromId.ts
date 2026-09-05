import type { Client } from '@urql/core'
import { isNotFound, unwrap } from '../client'
import { graphql } from '../graphql'

const query = graphql(`
    query getPostFromId($id: ID!) {
            post(id: $id) {
                id
                slug  
                url
             
        }
    }
`)

export const getPostByID =
	(makeClient: () => Client) => async (id?: string) => {
		if (!id) return undefined
		const client = makeClient()
		const result = await client.query(query, { id }).toPromise()
		// A missing post is a real 404, not an outage.
		if (isNotFound(result)) return undefined

		const data = unwrap(result, `getPostByID(${id})`)
		return data.post ?? undefined
	}
