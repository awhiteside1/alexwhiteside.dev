import type { Surreal } from 'surrealdb.js'

import type { Repository } from '../../schema/repository/repositoryTypes.js'

export const getAllRepositorys = async (db: Surreal) =>
	db.select<Repository>('repository')
