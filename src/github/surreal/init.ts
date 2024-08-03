import { Surreal } from 'surrealdb.js'
import { surrealdbNodeEngines } from 'surrealdb.node'

export const createDb = async (namespace="default", database="public") => {
    // Enable the WebAssembly engines
    const db = new Surreal({
        engines: surrealdbNodeEngines(),
    })

    // Now we can start SurrealDB as an in-memory database
    await db.connect('http://127.0.0.1:8000')

    await db.use({ namespace, database })

    return db
}
