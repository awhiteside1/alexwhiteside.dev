import reposByTagRaw from './repoByTag.surql?raw'
import {PreparedQuery, type RecordId, type Surreal} from "surrealdb.js";
import {get} from "radash";

export type IntoVector =
    | Float32Array
    | Float64Array
    | number[]
    | Promise<Float32Array | Float64Array | number[]>;

export const fetchReposByTopicIntent = async (db: Surreal, queryVector: IntoVector) => {

    const query = new PreparedQuery(reposByTagRaw, {queryVector})
    const result = await db.query<Array<Array<{id:RecordId, githubId:number, name:string}>>>(query)
    const repos = result.pop()
    return repos

}