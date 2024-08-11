import lancedb from '@lancedb/lancedb'
import { type EmbeddingFunction, getRegistry } from '@lancedb/lancedb/embedding'
import { OllamaEmbeddings } from './Ollama.ts'

const registry = getRegistry()

registry.register()(OllamaEmbeddings)

export const embeddingFunction = registry
	.get('ollama')
	?.create({ model: 'nomic-embed-text' }) as EmbeddingFunction

export const connectToDB = async (url = '/tmp/alexwhitesidedevdb') => {
	return lancedb.connect(url)
}
