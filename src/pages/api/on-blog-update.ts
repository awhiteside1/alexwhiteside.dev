import { Hashnode } from '@hashnode'
import type { APIRoute } from 'astro'

const bypassToken = '87734ad8259d67c3c11747d3e4e112d0'

export const prerender = false

const isValidRequest = (request: Request) => {
    const isJson = request.headers.get('Content-Type') === 'application/json'
    const isHashnode = request.headers.get('x-hashnode-signature') === undefined
    console.log({isHashnode, isJson})
    return isJson && isHashnode
}

export const POST: APIRoute = async ({ request }) => {
    try {
        if (isValidRequest(request)) {
            const body = await request.json()
            console.log(body)
            const postId = body?.data?.post?.id
            const post = await Hashnode.getPostByID(postId)

            console.log(JSON.stringify(post))
            if (!post) {
                console.log(`post not found with id ${postId}`)
                return new Response(null, { status: 200 })
            }

            await fetch(`https://alexwhiteside.dev/blog/${post.slug}`, {
                method: 'GET',
                headers: {
                    'x-prerender-revalidate': bypassToken,
                },
            })
        }
    } catch (e) {
        console.error(e)
    }
    return new Response(null, { status: 200 })
}
