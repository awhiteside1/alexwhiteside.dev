/* Place your custom changes here */

import { z } from 'zod'

import {
	resourceInputSchemaGen,
	resourceOutputSchemaGen,
} from '../../_generated/index.js'
import { recordId } from '../../_generated/recordSchema.js'

// payload schema for creating a new resource entity
export const resourceCreateSchema = resourceInputSchemaGen.merge(
	z.object({
		id: recordId('resource').optional(),
		// add your custom fields here, which are not part of SurrealDB table schema
		// they are not overwritten by the next run
	}),
)

// payload schema for fetching a resource entity
export const resourceSchema = resourceOutputSchemaGen.merge(
	z.object({
		id: recordId('resource'),
		// add your custom fields here, which are not part of SurrealDB table schema
		// they are not overwritten by the next run
	}),
)
