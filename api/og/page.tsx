import type { VercelRequest } from '@vercel/node'
import { ImageResponse } from '@vercel/og'
import { match } from 'ts-pattern'

export const config = {
	runtime: 'edge',
}

type PageParameters = {
	kind: 'page'
	title: string
	description: string
}

type PostParameters = {
	kind: 'post'
	title: string
	coverUrl: string
}

type RequestParameters = PageParameters | PostParameters | { kind: undefined }

const extractParametersFromRequest = (
	request: VercelRequest,
): RequestParameters => {
	if (!request.url) return { kind: undefined }
	const { searchParams } = new URL(request.url)
	const data = Object.fromEntries(searchParams.entries())
	return data as RequestParameters
}

export default async function handler(request: VercelRequest) {
	const params = extractParametersFromRequest(request)

	const display = match(params)
		.with({ kind: 'page' }, (page) => {
			return {
				title: page.title,
				image: undefined,
			}
		})
		.with({ kind: 'post' }, (post) => {
			return {
				title: post.title,
				image: post.coverUrl,
			}
		})
		.otherwise(() => {
			return {
				title: 'Alex Whiteside',
				image: undefined,
			}
		})

	return new ImageResponse(
		<div
			style={{
				margin: 0,
				padding: 0,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				fontFamily: 'Arial, sans-serif',
				background: 'linear-gradient(to bottom right, #f0f0f0, #ffffff)',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					textAlign: 'center',
				}}
			>
				<h1
					style={{
						fontSize: '3rem',
						margin: '20px 20px',
						flexGrow: 1,
						textAlign: 'right',
					}}
				>
					{display.title}
				</h1>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
		},
	)
}
