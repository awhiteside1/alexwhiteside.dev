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

const svg = btoa(
	`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='28' height='28' fill='none' stroke='#737373'><path d='M0 .5H31.5V32'/></svg>`,
)

const extractParametersFromRequest = (
	request: VercelRequest,
): RequestParameters => {
	if (!request.url) return { kind: undefined }
	const { searchParams } = new URL(request.url)
	const data = Object.fromEntries(searchParams.entries())
	return data as RequestParameters
}

const getConcourse = async () => {
	const res = await fetch(
		'https://alexwhiteside.dev/fonts/concourse-medium.ttf',
	)
	return res.arrayBuffer()
}
export default async function handler(request: VercelRequest) {
	const params = extractParametersFromRequest(request)

	const display = match(params)
		.with({ kind: 'page' }, (page) => {
			return {
				title: page.title,
				image: undefined,
				description: page.description,
			}
		})
		.with({ kind: 'post' }, (post) => {
			return {
				title: post.title,
				image: post.coverUrl,
				description: '',
			}
		})
		.otherwise(() => {
			return {
				title: 'Alex Whiteside',
				image: undefined,
				description: '',
			}
		})

	return new ImageResponse(
		<div
			style={{
				position: 'relative',
				margin: 0,
				padding: '10%',
				display: 'flex',
				background: 'white',
				color: 'black',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				width: '100vw',
				fontFamily: 'concourse, serif',
			}}
		>
			<div
				style={{
					backgroundImage: `url("data:image/svg+xml;base64,${svg}")`,
					inset: 0,
					opacity: 1,
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: 'flex',
					position: 'absolute',
				}}
			>
				<div
					style={{
						backgroundColor: 'rgba(255, 255, 255, 1)',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						maskImage:
							'radial-gradient(circle at bottom center, #0004 30%, #0008 60%, #000A 80%)',
						pointerEvents: 'none',
						position: 'absolute',
					}}
				/>
			</div>
			<div
				style={{
					width: '100%',
					display: 'flex',
					gap: 2,
					flexDirection: 'column',
					alignItems: 'flex-start',
				}}
			>
				<h1
					style={{
						fontSize: '100px',
						margin: 0,
						fontWeight: 'bold',
						textAlign: 'left',
					}}
				>
					{display.title}
				</h1>
				<p>{display.description}</p>
				<div
					style={{
						width: '100%',
						borderBottom: '1px solid gray',
					}}
				>
					{''}
				</div>

				<p style={{ color: 'gray' }}>alexwhiteside.dev</p>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'concourse',
					data: await getConcourse(),
					style: 'normal',
				},
			],
		},
	)
}
