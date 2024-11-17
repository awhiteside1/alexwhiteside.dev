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
	if (!request.url) return { kind: undefined }
	const { searchParams } = new URL(request.url)
	const data = Object.fromEntries(searchParams.entries())
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
			border: '2px solid #0000',
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
			border: '4px solid #0000',
			display: 'flex',
			width: units(15) - 2,
			height: units(6) - 2,
			justifyItems: 'right',
			alignItems: 'flex-end',
			flexDirection: 'column',
			background: 'white',
			padding: '14px',
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
				justifyItems: 'center',
				flexDirection: 'row',
				verticalAlign: 'middle',
				background: 'white',
				height: units(3),
			}}
		>
			<div
				style={{
					margin: 'auto',
					lineHeight: 1,
					textAlign: 'center',
					color: '#454545',
				}}
			>
				Alex Whiteside
			</div>
		</div>
		<div
			style={{
				display: 'flex',
				width: '100%',
				justifyContent: 'space-between',
				border: '2px solid #0000',
				flexDirection: 'row',
			}}
		>
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
						top: '29px',
						right: units(2),
					}}
				>
					<MastHead />
				</div>
				<div
					style={{
						position: 'absolute',
						margin: 1,
						display: 'flex',
						left: units(3),
						bottom: units(1) + 13,
						flexDirection: 'column',
						alignItems: 'flex-start',
					}}
				>
					<div
						style={{
							fontSize: '80px',
							margin: 1,
							marginBottom: 0,
							paddingLeft: 10,
							paddingBottom: 13,
							paddingTop: 13,
							lineHeight: '84px',
							background: 'white',
							fontWeight: 'bold',
							fontFamily: 'concourse-bold',
							// height: units(4) - 2,
							width: units(27) - 2,
						}}
					>
						{display.title}
					</div>
					{display.description && (
						<div
							style={{
								marginBottom: 1,
								marginLeft: 1,
								paddingTop: 13,
								paddingLeft: 10,
								paddingBottom: 13,
								width: round(880) - 2,
								background: 'white',
								display: 'flex',
							}}
						>
							<div
								style={{
									lineHeight: '56px',
									fontSize: '36px',
								}}
							>
								{display.description}
							</div>
						</div>
					)}
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
