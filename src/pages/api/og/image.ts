import { createImageElement } from '@ui/react/opengraph/og_elements.tsx'
import { ImageResponse } from '@vercel/og'
import type { APIRoute } from 'astro'
import { match } from 'ts-pattern'

export const prerender = false

type PageParameters = {
	kind: 'page'
	title: string
	description: string
}

type PostParameters = {
	kind: 'post'
	title: string
	coverUrl?: string
	image?: string
}

type RequestParameters = PageParameters | PostParameters | { kind: undefined }

const getFont = async (name: string) => {
	const res = await fetch(`https://alexwhiteside.dev/fonts/${name}.ttf`)
	return res.arrayBuffer()
}
export const GET: APIRoute<RequestParameters> = async ({ request, url }) => {
	//const params = extractParametersFromRequest(request)
	console.log(`OG Image Generatoor with url: ${url.href}`)
	const params = Object.fromEntries(
		url.searchParams.entries(),
	) as RequestParameters
	console.log(
		`OG Image Generatoor with params: ${JSON.stringify(params, undefined, 2)}`,
	)
	const display = match(params)
		.with({ kind: 'page' }, (page) => {
			console.log('Page Generating')
			return {
				title: page.title,
				image: undefined,
				description: page.description,
			}
		})
		.with({ kind: 'post' }, (post) => {
			console.log('Post Generating')
			return {
				title: post.title,
				image: post.coverUrl ?? post.image,
				description: 'Blog post by Alex Whiteside',
			}
		})
		.otherwise(() => {
			console.log('Default Generating')
			return {
				title: 'Alex Whiteside',
				image: undefined,
				description: '',
			}
		})
	return new ImageResponse(createImageElement(display), {
		headers: {
			'Cache-Control': 'public, s-maxage=1',
			'CDN-Cache-Control': 'public, s-maxage=10',
			'Vercel-CDN-Cache-Control': 'public, s-maxage=10',
			Vary: '*',
		},
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'concourse',
				data: await getFont('concourse-regular'),
				style: 'normal',
			},
			{
				name: 'concourse-bold',
				data: await getFont('concourse-medium'),
				style: 'normal',
			},
		],
	})
}
