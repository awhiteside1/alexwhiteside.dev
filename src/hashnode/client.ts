import { Client, fetchExchange } from '@urql/core'
import {sift} from 'radash'

export const makeClient = ()=>{
   return new Client({
        url: 'https://gql.hashnode.com',
        exchanges: sift([fetchExchange]),
        requestPolicy:'network-only',
        fetchOptions: () => {
            return {
                headers: { Authorization: import.meta.env.HASHNODE },
            }
        },
    })
}

