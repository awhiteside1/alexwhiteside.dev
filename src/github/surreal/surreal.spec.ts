import {type Surreal, surql } from 'surrealdb.js'
import { beforeAll, describe, it } from 'vitest'
import { createDb } from './init.ts'
import {insert} from "./insert.ts";
import { initSchema } from './schemas.ts'

describe('Surreal', () => {
    let db: Surreal
    beforeAll(async () => {
        db = await createDb()
    })
    it('should ', async () => {
        await initSchema(db)

    const result =  await   db.query(insert, {name:'squirrel'})

     const output =   await db.query(surql`SELECT * FROM resource WHERE repository.name = $name fetch repository; `, {name:'squirrel'})
console.log(output)
    })
})
