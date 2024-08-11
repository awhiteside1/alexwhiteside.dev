import type { RecordId, Surreal } from 'surrealdb.js'

import { resourceSchema } from '../../schema/resource/resourceSchema.js'
import type { Resource } from '../../schema/resource/resourceTypes.js'

export const getResourceById = async (db: Surreal, id: RecordId<string>) => {
	const key = resourceSchema.pick({ id: true }).parse({ id })

	const result = await db.query<[Resource | undefined]>(
		'SELECT * FROM ONLY $id',
		{ id },
	)

	return result[0]
}
