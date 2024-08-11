import type { Surreal } from 'surrealdb.js'

import { repositoryCreateSchema } from '../../schema/repository/repositorySchema.js'
import type { RepositoryCreate } from '../../schema/repository/repositoryTypes.js'

export const createRepository = async (
	db: Surreal,
	repository: RepositoryCreate,
) => {
	const payload = repositoryCreateSchema.parse(repository)

	const result = await db.create<RepositoryCreate>('repository', payload)

	return result[0]
}
