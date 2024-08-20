import type { VercelRequest } from '@vercel/node'
import { ImageResponse } from '@vercel/og'
import type { PropsWithChildren } from 'react'
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

const BORDERS = 'none' // `1px dashed ${draw(['blue', 'green', 'red', 'purple'])}`

const extractParametersFromRequest = (
	request: VercelRequest,
): RequestParameters => {
	console.table({ ...request.query, url: request.url })
	if (!request.query) return { kind: undefined }
	// const { searchParams } = new URL(request.url)
	const data = request.query
	return data as RequestParameters
}

const round = (value: number) => {
	return Math.ceil(value / 28) * 28
}

const units = (value: number) => {
	return value * 28
}

const Caption = (props: PropsWithChildren<{ units: number }>) => (
	<div
		style={{
			display: 'flex',
			height: units(1),
			width: units(props.units) - 2,
		}}
	>
		<div
			style={{
				color: '#404040',
				margin: 'auto',
				fontSize: '20px',
				backgroundColor: 'white',
			}}
		>
			{props.children}
		</div>
	</div>
)
const MastHead = () => (
	<div
		style={{
			border: BORDERS,
			display: 'flex',
			justifyItems: 'right',
			alignItems: 'flex-end',
			flexDirection: 'column',
		}}
	>
		<div
			style={{
				fontSize: '60px',
				margin: 0,
				fontWeight: 'bold',
				width: '100%',
				display: 'flex',
				color: '#262626',
				justifyItems: 'end',
				flexDirection: 'row',
				verticalAlign: 'bottom',

				height: units(2),
			}}
		>
			<div style={{ marginTop: 'auto', lineHeight: 1, textAlign: 'right' }}>
				Alex Whiteside
			</div>
		</div>
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<Caption units={6}>Software Architect</Caption>
			<Caption units={4}>Entrepreneur</Caption>
			<Caption units={3}>Creative</Caption>
		</div>
	</div>
)
const getFont = async (name: string) => {
	const res = await fetch(`https://alexwhiteside.dev/fonts/${name}.ttf`)
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
				padding: 0,
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
					backgroundOrigin: 'center center',
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
					border: BORDERS,
					position: 'relative',
					display: 'flex',
					width: '1148px',
					height: '574px',
				}}
			>
				<div
					style={{
						position: 'absolute',
						display: 'flex',
						top: '28px',
						right: '28px',
					}}
				>
					<MastHead />
				</div>
				<div
					style={{
						position: 'absolute',
						bottom: 0,
						width: '100%',
						display: 'flex',
						gap: '28px',
						flexDirection: 'column',
						alignItems: 'flex-start',
					}}
				>
					<div
						style={{
							fontSize: '80px',
							margin: 0,
							fontWeight: 'bold',
							textAlign: 'left',
						}}
					>
						{display.title}
					</div>
					<div style={{ background: 'white', fontSize: '36px' }}>
						{display.description}
					</div>
				</div>
			</div>
		</div>,
		{
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
		},
	)
}
