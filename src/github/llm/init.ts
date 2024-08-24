import { fromNodeProviderChain } from '@aws-sdk/credential-providers' // ES6 import
import lancedb from '@lancedb/lancedb'
import { type EmbeddingFunction, getRegistry } from '@lancedb/lancedb/embedding'
import { OllamaEmbeddings } from './Ollama.ts'

const registry = getRegistry()

registry.register()(OllamaEmbeddings)

export const embeddingFunction = registry
	.get('ollama')
	?.create({ model: 'nomic-embed-text' }) as EmbeddingFunction

const credentials = fromNodeProviderChain()

console.log(typeof credentials)

export const connectToDB = async (url = '/tmp/alexwhitesidedevdb') => {
	const creds = await credentials()
	const { accessKeyId, secretAccessKey } = creds
	return lancedb.connect('s3://alexwhitesidedev/lancedb/', {
		storageOptions: {
			accessKeyId,
			secretAccessKey,
			region: 'us-east-1',
		},
	})
}
