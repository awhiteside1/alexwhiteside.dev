import type { Surreal } from 'surrealdb.js'

import { createText } from './createText.js'
import { deleteText } from './deleteText.js'
import { getAllTexts } from './getAllTexts.js'
import { getTextById } from './getTextById.js'
import { updateText } from './updateText.js'

export const getTextRepository = (db: Surreal) => {
	return {
		createText: createText.bind(undefined, db),
		getAllTexts: getAllTexts.bind(undefined, db),
		getTextById: getTextById.bind(undefined, db),
		updateText: updateText.bind(undefined, db),
		deleteText: deleteText.bind(undefined, db),
	}
}
