import lancedb from '@lancedb/lancedb'

import {awsCredentialsProvider} from '@vercel/functions/oidc'
import type {APIRoute} from "astro";

const getSecrets = () => {
    const NOMIC_API_LEY = process.env.NOMIC_API

    if (!NOMIC_API_LEY) throw new Error('Missing NOMIC API')
    return {NOMIC_API_LEY}
}

export const GET: APIRoute = async (
    {
       url
    }
) => {
    const {term} = Object.fromEntries(url.searchParams.entries())
    console.log({term})
    if (!term) return new Response(JSON.stringify({error: 'Missing term'}), {status: 400})

    const termString = typeof term === 'string' ? term : term[0]
    try {
        const credentials = awsCredentialsProvider({
            roleArn: process.env.AWS_ROLE_ARN,
        })

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


        return new Response(JSON.stringify(results), {
            status: 200, headers: {
                'Cache-Control':
                    'public,max-age=1800,s-maxage=86400,stale-while-revalidate=59', 'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({error: 'Internal Server Error'}), {status: 500})
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
