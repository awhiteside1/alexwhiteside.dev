import type {NodePlopAPI} from 'plop'
import {setupContentTemplate} from './content'
import {setupHelpers} from './helpers/common.ts'
import {setupSchemaInquirerer} from './helpers/schemaQuestioner.ts'
import {config} from "dotenv";
import {join} from 'node:path';

const x = config({ path: join(process.cwd(), '.env') })
console.log(JSON.stringify(x))
export default async function (plop: NodePlopAPI) {
	setupSchemaInquirerer(plop)
	setupHelpers(plop)
	setupContentTemplate(plop)
}
