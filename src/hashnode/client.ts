import { HASHNODE } from 'astro:env/server'
import { Client, fetchExchange, type OperationResult } from '@urql/core'
import { sift } from 'radash'

// Hashnode moved the public API off gql.hashnode.com, which now blanket-redirects
// every request (auth or not) to their pricing changelog.
const endpoint = 'https://gql-beta.hashnode.com'

export const makeClient = () => {
	return new Client({
		url: endpoint,
		exchanges: sift([fetchExchange]),
		requestPolicy: 'network-only',
		fetchOptions: () => {
			return {
				headers: { Authorization: `Bearer ${HASHNODE}` },
			}
		},
	})
}

export class HashnodeError extends Error {
	override name = 'HashnodeError'
}

/**
 * Hashnode reports a missing resource as a GraphQL error rather than null data,
 * so an absent post is indistinguishable from an outage unless we read the code.
 */
export const isNotFound = (result: OperationResult<unknown>) =>
	result.error?.graphQLErrors.some(
		(error) => error.extensions?.code === 'NOT_FOUND',
	) ?? false

/**
 * Surfaces transport and GraphQL errors instead of letting them collapse into an
 * empty page. Callers decide what an *absent* resource means; a failed request is
 * never one of those.
 */
export const unwrap = <T>(result: OperationResult<T>, operation: string): T => {
	if (result.error) {
		throw new HashnodeError(`${operation} failed: ${result.error.message}`, {
			cause: result.error,
		})
	}

	if (!result.data) {
		throw new HashnodeError(`${operation} returned no data`)
	}

	return result.data
}

/**
 * A null publication means the host is wrong or the publication lost Pro access,
 * both of which are outages rather than "no posts yet".
 */
export const requirePublication = <T>(
	publication: T | null | undefined,
	operation: string,
): T => {
	if (!publication) {
		throw new HashnodeError(
			`${operation} found no publication - check the host and that it is on an active Pro plan`,
		)
	}

	return publication
}
