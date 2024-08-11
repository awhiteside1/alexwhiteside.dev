/* Place your custom changes here */

import type { RecordId } from 'surrealdb.js'
import type { z } from 'zod'

import type { textCreateSchema, textSchema } from './textSchema.js'

// the create type for table text
export type TextCreate = z.input<typeof textCreateSchema>

// the select type for table text
export type Text = z.output<typeof textSchema> & { id: RecordId<string> }
