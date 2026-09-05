import { HASHNODE_WEBHOOK_SECRET } from 'astro:env/server'
import { Hashnode } from '@hashnode'
import { verifyWebhookSignature } from '@hashnode/webhook'
import type { APIRoute } from 'astro'

const bypassToken = '87734ad8259d67c3c11747d3e4e112d01234'

export const prerender = false

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
	if (request.headers.get('Content-Type') !== 'application/json') {
		return new Response('Expected application/json', { status: 415 })
	}

	// The signature covers the raw bytes, so the body must be read as text and
	// parsed afterwards rather than via request.json().
	const body = await request.text()

	const verification = verifyWebhookSignature({
		body,
		header: request.headers.get('x-hashnode-signature'),
		secret: HASHNODE_WEBHOOK_SECRET,
	})

	if (!verification.valid) {
		console.warn(`Rejected webhook: ${verification.reason}`)
		return new Response(verification.reason, { status: 401 })
	}

	let postId: string | undefined
	try {
		postId = JSON.parse(body)?.data?.post?.id
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
