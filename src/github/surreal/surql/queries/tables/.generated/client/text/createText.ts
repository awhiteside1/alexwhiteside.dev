import type { Surreal } from 'surrealdb.js'

import { textCreateSchema } from '../../schema/text/textSchema.js'
import type { TextCreate } from '../../schema/text/textTypes.js'

export const createText = async (db: Surreal, text: TextCreate) => {
	const payload = textCreateSchema.parse(text)

	const result = await db.create<TextCreate>('text', payload)

	return result[0]
}
