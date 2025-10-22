import { resolve } from "jsr:@std/path";

const outputPath = resolve('../data/raw')
const original = Deno.readTextFileSync('/Users/awhiteside/Downloads/part-00000-3d3308d5-3ac8-460b-9092-73f2be6f2873-c000.jsonl')
const lines = original.split('\n')
for(const line of lines){
    const parsed = JSON.parse(line)
    const filename = `${parsed.id}.json`
    Deno.writeTextFileSync(resolve(outputPath, filename), JSON.stringify(parsed))
}

