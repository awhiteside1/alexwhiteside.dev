import type {VercelRequest, VercelResponse} from '@vercel/node'
import lancedb from "@lancedb/lancedb";

const getSecrets = () => {
    const NOMIC_API_LEY = process.env.NOMIC_API
    const S3_SECRET = process.env.CLOUDFLARE_S3_SECRET
    if (!NOMIC_API_LEY) throw new Error('Missing NOMIC API')
    if (!S3_SECRET) throw new Error('Missing S3 Secret API')
    return {NOMIC_API_LEY, S3_SECRET}
}

export default async function (request: VercelRequest, response: VercelResponse) {
    const {term} = request.query;
    if (!term) return response.status(400).json({error: 'Missing term'})
    const termString = typeof term === 'string' ? term : term[0]
    try {
        const connection = await lancedb.connect('s3://alexwhitesidedev/', {
            storageOptions: {
                awsAccessKeyId: "e211da2bae41c27edf7b98498f1c4e2a",
                endpoint: "https://4e48ace160a6411277cc07341caa999d.r2.cloudflarestorage.com",
                awsSecretAccessKey: getSecrets().S3_SECRET!,
                region: "auto",
            }
        })
        console.log(await connection.tableNames())

        const table = await connection.openTable('cache')
        const results = await table.query().nearestTo(await fetchEmbedding(termString)).column('embedding').distanceType('cosine').limit(10).select(['repos', 'original']).bypassVectorIndex().toArray()
        console.log(results)
        return response.status(200).json(results)
    } catch (err) {
        console.error(err)
        response.status(500).json(err)
    }

}


const fetchEmbedding = async (term: string) => {
    const response = await fetch(`https://api-atlas.nomic.ai/v1/embedding/text`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getSecrets().NOMIC_API_LEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "nomic-embed-text-v1.5",
                texts: [term],
                dimensionality: 768,
                task_type: 'search_query'
            }),
        })

    const json = await response.json() as { embeddings: number[][] }
    return json.embeddings[0]

}