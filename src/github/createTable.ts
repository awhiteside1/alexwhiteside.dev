import  lancedb from "@lancedb/lancedb";
import  {Schema, Field, Int32, Utf8,Vector, Float32} from "@apache-arrow/esnext-esm";
import { LanceSchema, getRegistry, register } from "@lancedb/lancedb/embedding";
import type { EmbeddingFunction } from "@lancedb/lancedb/embedding";
import { OllamaEmbeddings } from "./llm/Ollama";
import { getStarredRepos } from "./getRepos";

const registry = getRegistry()

  registry.register()(OllamaEmbeddings)
  const func = registry.get('ollama')?.create({ model: "nomic-embed-text" }) as EmbeddingFunction;


const uri = "/tmp/lancedb/";
const db = await lancedb.connect(uri);

const repoSchema = new Schema([
    new Field("id", new Int32()),
    new Field("name", new Utf8()),
    new Field("url", new Utf8()),
    new Field("json", new Utf8()),
    new Field("description", new Utf8()),
    new Field("language", new Utf8()),
    new Field("topics", new Utf8()),


  ])

  const wordsSchema = LanceSchema({
    text: func.sourceField(new Utf8()),
    vector: func.vectorField({datatype: new Float32(), dims: 768}),
  });




  




const schema = LanceSchema({
  vector: func.vectorField({datatype: new Float32(), dims: 768}),
  text: func.sourceField(new Utf8()),
  repository:new Int32(),
});

const topicsTable = await db.createEmptyTable("topics", schema, { mode: "overwrite" });



export const createTable = async () => {
  const repos = await getStarredRepos(false)
  for (const repo of repos) {
    for (const topic of repo.topics) {
      try{
      await topicsTable.add([{ text: topic, repository: repo.id }])
    }catch(e){
      console.log(e)
    }
    }
  }
  console.log("added topics")

  const results = await topicsTable.search("lock").limit(1).toArray();
  console.log(results[0].text);

}