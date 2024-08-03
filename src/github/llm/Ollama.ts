import {Float32} from "@apache-arrow/esnext-esm";
import {EmbeddingFunction, register,} from "@lancedb/lancedb/embedding";
import {Ollama} from 'ollama'

const client = new Ollama({
  host: 'http://100.118.219.122:11434'
});

@register("ollama")
export class OllamaEmbeddings extends EmbeddingFunction {
    async computeSourceEmbeddings(data: string[]): Promise<number[][]> {
        const embeddings = await Promise.all(data.map(async (text) => {
            const response = await client.embeddings({
                model: 'nomic-embed-text',
                prompt: text
            });
            return response.embedding;
        }));
        return embeddings;
    }

    ndims() {
        return 768;
    }
    toJSON(): object {
        return {
            type: 'ollama'
        };
    }

    embeddingDataType() {
        return new Float32();
    }

}