import { Client, fetchExchange,cacheExchange } from '@urql/core'

export const client = new Client({
    url: 'https://gql.hashnode.com',
    exchanges: [cacheExchange,fetchExchange],
    requestPolicy:'network-only',
    fetchOptions: () => {
        return {
            headers: { Authorization: import.meta.env.HASHNODE },
        }
    },
})
