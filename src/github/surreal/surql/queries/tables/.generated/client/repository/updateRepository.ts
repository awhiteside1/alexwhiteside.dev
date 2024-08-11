import type { RecordId, Surreal } from 'surrealdb.js'

import { repositorySchema } from '../../schema/repository/repositorySchema.js'
import type { Repository } from '../../schema/repository/repositoryTypes.js'

export const updateRepository = async (
	db: Surreal,
	id: RecordId,
	repository: Partial<Repository>,
) => {
	const _key = repositorySchema.pick({ id: true }).parse({ id })
	const payload = repositorySchema
		.omit({ id: true })
		.partial()
		.parse(repository)

	return db.merge<Repository>(id, payload)
}
