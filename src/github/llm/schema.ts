import {Field, Float32, Int32, List, Schema, Utf8, Vector} from "@apache-arrow/esnext-esm";
import {LanceSchema} from "@lancedb/lancedb/embedding";
import {connectToDB, embeddingFunction} from "./init.ts";


const repoSchema = new Schema([
    new Field("id", new Int32()),
    new Field("name", new Utf8()),
    new Field("url", new Utf8()),
    new Field("json", new Utf8()),
    new Field("description", new Utf8()),
    new Field("language", new Utf8()),
    new Field("topics", new List(new Field("topic", new Utf8())),),


])

const topicsSchema = LanceSchema({
    vector: embeddingFunction.vectorField({datatype: new Float32(), dims: 768}),
    text: embeddingFunction.sourceField(new Utf8()),
});

const resourcesPartSchema = LanceSchema({
    vector: embeddingFunction.vectorField({datatype: new Float32(), dims: 768}),
    text: embeddingFunction.sourceField(new Utf8()),
    resource:new Int32(),
});

const resourcesSchema = LanceSchema({
    source: new Utf8(),
    id: new Int32(),
    repository:new Int32(),
});



export const init=async ()=>{
    const db = await connectToDB()
    const topics= await db.createEmptyTable("topics", topicsSchema, { mode: "create", existOk:true });
    const repositories= await db.createEmptyTable("repositories", repoSchema, { mode: "create", existOk:true });
    const resources= await db.createEmptyTable("resources", resourcesSchema, { mode: "create", existOk:true });
    const resourceParts= await db.createEmptyTable("resource_parts", resourcesPartSchema, { mode: "create", existOk:true });

    return { topics, repositories, resourceParts, resources };

}



 

