import type { NodePlopAPI } from 'plop'
import { setupContentTemplate } from './content'
import { setupHelpers } from './helpers/common.ts'
import { setupSchemaInquirerer } from './helpers/schemaQuestioner.ts'

export default async function (plop: NodePlopAPI) {
	setupSchemaInquirerer(plop)
	setupHelpers(plop)
	setupContentTemplate(plop)
}
