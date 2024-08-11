import type { RecordId, Surreal } from 'surrealdb.js'

import type { Resource } from '../../schema/resource/resourceTypes.js'

export const deleteResource = async (db: Surreal, id: RecordId) =>
	db.delete<Resource>(id)
