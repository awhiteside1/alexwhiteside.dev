// import {fetchReposByTopicAll, schema} from "./index";
// import {createDb} from "../../../init";
//
// import {describe, it} from "vitest";
// import {connectToDB} from "../../../../llm/init.ts";
// import {OllamaEmbeddings} from "../../../../llm/Ollama.ts";
// import {init} from "../../../../llm/schema.ts";
//
// describe('', () => {
//     it('should ', async () => {
//         const embedding = await new OllamaEmbeddings().computeQueryEmbeddings('code')
//     //const         db = await createDb()
// // const connect = await connectToDB()
//    //     await connect.dropTable('cache')
//         const   tables = await init()
//         //const response = await fetchReposByTopicAll(db) as Array<Record<string, any>>
//         // const goodTable = await connect.createEmptyTable('reposCache', schema, {existOk:true, mode:"create"})
//
//         // const table = await connect.createEmptyTable('cache', schema, {existOk:true, mode:'create'})
// //        const data = await table.toArrow()
//   //      const result = data.get(0)?.toJSON()
//     //    console.log (result)
//         const topics = await table.vectorSearch(embedding).postfilter().where("_distance < 400").select(['original', "repos"]).limit(15).toArray()
//         console.log(topics)
//   //      console.log(response)
//     }, {timeout:50000});
// });