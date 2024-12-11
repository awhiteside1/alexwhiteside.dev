import lancedb from '@lancedb/lancedb'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { awsCredentialsProvider } from '@vercel/functions/oidc'

const getSecrets = () => {
	const NOMIC_API_LEY = process.env.NOMIC_API

	if (!NOMIC_API_LEY) throw new Error('Missing NOMIC API')
	return { NOMIC_API_LEY }
}

export default async function (
	request: VercelRequest,
	response: VercelResponse,
) {
	const { term } = request.query
	if (!term) return response.status(400).json({ error: 'Missing term' })
	const termString = typeof term === 'string' ? term : term[0]
	try {
		const credentials = awsCredentialsProvider({
			roleArn: process.env.AWS_ROLE_ARN,
		})
		console.log(typeof credentials)

		const connection = await lancedb.connect('s3://alexwhitesidedev/lancedb/', {
			storageOptions: {
				region: 'us-east-1',
			},
		})

		const table = await connection.openTable('cache')
		const results = await table
			.query()
			.nearestTo(await fetchEmbedding(termString))
			.column('embedding')
			.distanceType('cosine')
			.limit(10)
			.select(['repos', 'original'])
			.bypassVectorIndex()
			.toArray()
		response.setHeader(
			'Cache-Control',
			'public,max-age=1800,s-maxage=86400,stale-while-revalidate=59',
		)
		return response.status(200).json(results)
	} catch (err) {
		console.error(err)
		response.status(500).json(err)
	}
}

const fetchEmbedding = async (term: string) => {
	const response = await fetch('https://api-atlas.nomic.ai/v1/embedding/text', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${getSecrets().NOMIC_API_LEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			model: 'nomic-embed-text-v1.5',
			texts: [term],
			dimensionality: 768,
			task_type: 'search_query',
		}),
	})

	const json = (await response.json()) as { embeddings: number[][] }
	return json.embeddings[0]
}
