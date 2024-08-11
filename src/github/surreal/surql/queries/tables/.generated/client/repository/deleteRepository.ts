import type { RecordId, Surreal } from 'surrealdb.js'

import type { Repository } from '../../schema/repository/repositoryTypes.js'

export const deleteRepository = async (db: Surreal, id: RecordId) =>
	db.delete<Repository>(id)
