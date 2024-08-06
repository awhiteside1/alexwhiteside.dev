import pl from 'nodejs-polars'
import { describe, it } from 'vitest'
import { list } from 'radash'
import lancedb from '@lancedb/lancedb'
import * as Arrow from '@apache-arrow/esnext-esm'
import { LanceSchema } from '@lancedb/lancedb/embedding'

describe('Polars', () => {
    it('should ', async () => {
        const fooSeries = pl.Series('foo', [1, 2, 3])
        const data = [
            { name: 'thing', details: { foo: 'bar' }, count: 8, topics: [2, 3] },
            { name: 'tothing', details: { foo: 'baz' }, count: 2, topics: [1] },
        ]
        const schema = {
            name: pl.String,
            details: pl.Struct({ foo: pl.String }),
            count: pl.Int16,
            topics: pl.List(pl.Int32),
        }
        const lanceSchema = LanceSchema({
            name: new Arrow.Utf8(),
            details: new Arrow.Struct([new Arrow.Field('foo', new Arrow.Utf8())]),
            count: new Arrow.Int32(),
            topics: new Arrow.List(new Arrow.Field('topicId', new Arrow.Int32())),
        })

        const junction = {
            repository: pl.String,
            topic: pl.Int32,
        }

        const topicsSchema = {
            name: pl.String,
            id: pl.Int32,
        }

        const topics = pl.DataFrame(
            list(0, 10, (id) => ({ id, name: `topic-${id}` })),
            { schema: topicsSchema }
        )

        const frame = pl.DataFrame(data, { schema })
        const exploded = frame.explode('topics')
        const joined = exploded.join(topics, { leftOn: 'topics', rightOn: 'id' })

        console.log(joined.tail(1).toHTML())

        const db = await lancedb.connect('/tmp/polars/lance')
        const table = await db.createEmptyTable('repos', lanceSchema, {
            mode: 'create',
            existOk: true,
        })

        await table.add(data)

        const result = await table.query().toArray()

        const ipc = pl.readRecords(result)

        console.log(ipc)
    })
})
