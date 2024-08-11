import type { RecordId, Surreal } from 'surrealdb.js'

import type { Text } from '../../schema/text/textTypes.js'

export const deleteText = async (db: Surreal, id: RecordId) =>
	db.delete<Text>(id)
