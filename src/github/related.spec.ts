import {fetchEmbedding} from '../../api/related.ts'
import {describe,it} from "vitest";

describe('fdssf', () => {
    it('should ', async() => {

        const x = await fetchEmbedding('term')
        console.log(x)
    });
});