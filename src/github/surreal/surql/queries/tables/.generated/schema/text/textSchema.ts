/* Place your custom changes here */

import { z } from 'zod'

import {
	textInputSchemaGen,
	textOutputSchemaGen,
} from '../../_generated/index.js'
import { recordId } from '../../_generated/recordSchema.js'

// payload schema for creating a new text entity
export const textCreateSchema = textInputSchemaGen.merge(
	z.object({
		id: recordId('text').optional(),
		// add your custom fields here, which are not part of SurrealDB table schema
		// they are not overwritten by the next run
	}),
)

// payload schema for fetching a text entity
export const textSchema = textOutputSchemaGen.merge(
	z.object({
		id: recordId('text'),
		// add your custom fields here, which are not part of SurrealDB table schema
		// they are not overwritten by the next run
	}),
)
