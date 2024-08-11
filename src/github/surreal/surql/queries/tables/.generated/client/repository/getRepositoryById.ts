import type { RecordId, Surreal } from 'surrealdb.js'

import { repositorySchema } from '../../schema/repository/repositorySchema.js'
import type { Repository } from '../../schema/repository/repositoryTypes.js'

export const getRepositoryById = async (db: Surreal, id: RecordId<string>) => {
	const key = repositorySchema.pick({ id: true }).parse({ id })

	const result = await db.query<[Repository | undefined]>(
		'SELECT * FROM ONLY $id',
		{ id },
	)

	return result[0]
}
