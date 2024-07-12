import { Client, cacheExchange, fetchExchange } from '@urql/core'

export const client = new Client({
	url: 'https://gql.hashnode.com',
	exchanges: [cacheExchange, fetchExchange],
	fetchOptions: () => {
		return {
			headers: { Authorization: import.meta.env.HASHNODE },
		}
	},
})
