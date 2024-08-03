import {PreparedQuery, type RecordId, type Surreal} from "surrealdb.js";
import reposPerTopicRaw from './reposPerTopic.surql?raw'
import {LanceSchema} from "@lancedb/lancedb/embedding";
import {Field, Float32, Int32, List, Utf8} from "@apache-arrow/esnext-esm";
import {embeddingFunction} from "../../../../llm/init";

export type IntoVector =
    | Float32Array
    | Float64Array
    | number[]
    | Promise<Float32Array | Float64Array | number[]>;

export const fetchReposByTopicAll = async (db: Surreal) => {

    const query = new PreparedQuery(reposPerTopicRaw)
   return db.query(query).then(x=>x.pop())

}


export const schema= LanceSchema({
    embedding: embeddingFunction.vectorField({datatype: new Float32(), dims: 768}),
    original: embeddingFunction.sourceField(new Utf8()),
    repos: new List(new Field("repos", new Utf8()))
});