import type { Surreal } from 'surrealdb.js'

import { createResource } from './createResource.js'
import { deleteResource } from './deleteResource.js'
import { getAllResources } from './getAllResources.js'
import { getResourceById } from './getResourceById.js'
import { updateResource } from './updateResource.js'

export const getResourceRepository = (db: Surreal) => {
	return {
		createResource: createResource.bind(undefined, db),
		getAllResources: getAllResources.bind(undefined, db),
		getResourceById: getResourceById.bind(undefined, db),
		updateResource: updateResource.bind(undefined, db),
		deleteResource: deleteResource.bind(undefined, db),
	}
}
