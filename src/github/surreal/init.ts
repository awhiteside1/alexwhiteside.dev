import { Surreal } from 'surrealdb.js'
import { surrealdbNodeEngines } from 'surrealdb.node'

export const createDb = async () => {
    // Enable the WebAssembly engines
    const db = new Surreal({
        engines: surrealdbNodeEngines(),
    })

    // Now we can start SurrealDB as an in-memory database
    await db.connect('http://127.0.0.1:8000/rpc')

    db.use({ namespace: 'mine', database: 'mine' })

    return db
}
