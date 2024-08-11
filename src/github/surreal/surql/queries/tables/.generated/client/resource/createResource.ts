import type { Surreal } from 'surrealdb.js'

import { resourceCreateSchema } from '../../schema/resource/resourceSchema.js'
import type { ResourceCreate } from '../../schema/resource/resourceTypes.js'

export const createResource = async (db: Surreal, resource: ResourceCreate) => {
	const payload = resourceCreateSchema.parse(resource)

	const result = await db.create<ResourceCreate>('resource', payload)

	return result[0]
}
