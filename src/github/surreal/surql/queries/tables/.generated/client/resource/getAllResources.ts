import type { Surreal } from 'surrealdb.js'

import type { Resource } from '../../schema/resource/resourceTypes.js'

export const getAllResources = async (db: Surreal) =>
	db.select<Resource>('resource')
