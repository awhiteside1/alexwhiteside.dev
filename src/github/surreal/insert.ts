import type {Surreal} from 'surrealdb.js'
import type {RepoPartial} from "../getRepos.ts";
import {OllamaEmbeddings} from "../llm/Ollama.ts";
import {SurrealTables} from "./surql/queries/tables";

export const insertRepository = async (db: Surreal, repo: RepoPartial) => {
    try {
        const record = await SurrealTables.Repository.createRepository(db, {
            name: repo.name,
            githubId: repo.id,
            details: repo,
            url: repo.url,
            topics: repo.topics
        })
        const embeddingResult = await new OllamaEmbeddings().computeSourceEmbeddings(repo.topics)
        for (const [index, topic] of repo.topics.entries()) {
            try {
                // Upsert text and create relation in the same query
                const resultt = await db.query(`
                    LET $existingText = SELECT * FROM text WHERE original = $topic LIMIT 1;
                    LET $text = IF (array::len($existingText) > 0) THEN
                        RETURN $existingText[0];
                    ELSE
                       CREATE  text CONTENT { original: $topic, embedding: $embedding } RETURN AFTER;
                    END;  
                   RELATE $recordId->resource->$text SET kind = 'topic', url = 'http://github.com';
                `, { topic, embedding: embeddingResult[index], recordId: record.id });
                console.log(resultt)
            } catch (err) {
                console.error(err)
            }
        }
    } catch (err) {
        return undefined
    }
}