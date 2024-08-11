import type { Surreal } from 'surrealdb.js'

import type { Text } from '../../schema/text/textTypes.js'

export const getAllTexts = async (db: Surreal) => db.select<Text>('text')
