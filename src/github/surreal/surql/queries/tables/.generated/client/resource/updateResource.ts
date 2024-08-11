import type { RecordId, Surreal } from 'surrealdb.js'

import { resourceSchema } from '../../schema/resource/resourceSchema.js'
import type { Resource } from '../../schema/resource/resourceTypes.js'

export const updateResource = async (
	db: Surreal,
	id: RecordId,
	resource: Partial<Resource>,
) => {
	const _key = resourceSchema.pick({ id: true }).parse({ id })
	const payload = resourceSchema.omit({ id: true }).partial().parse(resource)

	return db.merge<Resource>(id, payload)
}
