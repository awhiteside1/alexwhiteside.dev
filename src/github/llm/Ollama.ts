import { Float32 } from '@apache-arrow/esnext-esm'
import { EmbeddingFunction, register } from '@lancedb/lancedb/embedding'
import { Ollama } from 'ollama'
import { parallel } from 'radash'

const client = new Ollama({
    host: 'http://127.0.0.1:11434',
})

@register('ollama')
export class OllamaEmbeddings extends EmbeddingFunction {
    async computeQueryEmbeddings(data: string) {
        const result = await client.embeddings({
            model: 'nomic-embed-text',
            prompt: data,
        })

        return result.embedding
    }
    async computeSourceEmbeddings(data: string[]): Promise<number[][]> {
        const embeddings = await parallel(3, data, async (text) => {
            const response = await client.embeddings({
                model: 'nomic-embed-text',
                prompt: text,
            })
            return response.embedding
        })
        return embeddings
    }

    ndims() {
        return 768
    }
    toJSON(): object {
        return {
            type: 'ollama',
        }
    }

    embeddingDataType() {
        return new Float32()
    }
}
