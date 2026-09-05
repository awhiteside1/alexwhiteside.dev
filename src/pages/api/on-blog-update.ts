import { Hashnode } from '@hashnode'
import type { APIRoute } from 'astro'

const bypassToken = '87734ad8259d67c3c11747d3e4e112d01234'

export const prerender = false

const isValidRequest = (request: Request) => {
	const isJson = request.headers.get('Content-Type') === 'application/json'
	// Headers.get() yields null, never undefined - comparing against undefined
	// made this check pass for every caller.
	const isHashnode = request.headers.get('x-hashnode-signature') !== null
	return isJson && isHashnode
}

const revalidate = async (slug: string) => {
	const pages = [
		'https://alexwhiteside.dev',
		'https://alexwhiteside.dev/blog',
		`https://alexwhiteside.dev/blog/${slug}`,
	]

	const results = await Promise.allSettled(
		pages.map((page) =>
			fetch(page, {
				method: 'GET',
				headers: {
					'x-prerender-revalidate': bypassToken,
				},
			}),
		),
	)

	for (const [index, result] of results.entries()) {
		console.log(
			result.status === 'fulfilled'
				? `revalidate ${pages[index]} -> ${result.value.status}`
				: `revalidate ${pages[index]} -> rejected: ${result.reason}`,
		)
	}

	return results.every(
		(result) => result.status === 'fulfilled' && result.value.ok,
	)
}

export const POST: APIRoute = async ({ request }) => {
	if (!isValidRequest(request)) {
		return new Response('Not a Hashnode webhook request', { status: 401 })
	}

	let postId: string | undefined
	try {
		const body = await request.json()
		postId = body?.data?.post?.id
	} catch (e) {
		console.error('Malformed webhook body', e)
		return new Response('Malformed body', { status: 400 })
	}

	if (!postId) {
		return new Response('Missing data.post.id', { status: 400 })
	}

	// A failed lookup is retryable, so it must not be reported as success.
	let post: Awaited<ReturnType<typeof Hashnode.getPostByID>>
	try {
		post = await Hashnode.getPostByID(postId)
	} catch (e) {
		console.error(`Hashnode lookup failed for ${postId}`, e)
		return new Response('Upstream lookup failed', { status: 502 })
	}

	if (!post) {
		console.log(`post not found with id ${postId}`)
		return new Response('Post not found', { status: 404 })
	}

	return (await revalidate(post.slug))
		? new Response(null, { status: 200 })
		: new Response('Revalidation incomplete', { status: 502 })
}
