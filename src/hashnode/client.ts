import { Client, fetchExchange, debugExchange } from '@urql/core'
import {sift} from 'radash'

const isDev =()=>process.env.NODE_ENV === 'development'
export const client = new Client({
    url: 'https://gql.hashnode.com',
    exchanges: sift([isDev() && debugExchange,fetchExchange]),
    requestPolicy:'network-only',
    fetchOptions: () => {
        return {
            headers: { Authorization: import.meta.env.HASHNODE },
        }
    },
})
