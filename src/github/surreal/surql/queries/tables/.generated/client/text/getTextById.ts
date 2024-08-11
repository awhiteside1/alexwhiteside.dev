import type { RecordId, Surreal } from 'surrealdb.js'

import { textSchema } from '../../schema/text/textSchema.js'
import type { Text } from '../../schema/text/textTypes.js'

export const getTextById = async (db: Surreal, id: RecordId<string>) => {
	const key = textSchema.pick({ id: true }).parse({ id })

	const result = await db.query<[Text | undefined]>('SELECT * FROM ONLY $id', {
		id,
	})

	return result[0]
}
