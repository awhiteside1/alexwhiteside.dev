import type {ReadLine} from 'node:readline'
import inquirer from 'inquirer'
// @ts-ignore
import type {Question} from 'inquirer/dist/esm/types/types'
import type {NodePlopAPI} from 'plop'
import {capitalize, get, mapValues} from 'radash'
import type {ZodObjectDef, ZodType, ZodTypeAny} from 'zod'
import {collections} from '../../src/content/config.ts'
import {OpenAIInferer} from './OpenAIInferer.ts'

type PromptState = 'pending' | 'idle' | 'loading' | 'answered' | 'done'

class SchemaPrompt {
	constructor(
		private question: Record<string, unknown>,
		private readLine: ReadLine,
		private answers: Record<string, unknown>,
	) {
		console.log('Schema Prompt Created')
		this.status = 'pending'
		console.log(question)
		console.log(answers)
	}

	resolveSchema() {
		const collection = get<{ schema: ZodObjectDef }>(
			collections,
			get(this.answers, 'collection'),
		)
		if (collection?.schema) {
			return collection.schema
		}
		throw new Error('Invalid Collection Schema')
	}

	getTypeFromObjectDef(schema: ZodTypeAny): object {
		try {
			const def = schema._def
			switch (def.typeName) {
				case 'ZodDefault':
				case 'ZodOptional':
					return this.getTypeFromObjectDef(def.innerType)
				case 'ZodString':
					return { type: 'input' }
				case 'ZodBoolean':
					return { type: 'checkbox', choices: ['true', 'false'] }
			}
		} catch (err) {
			console.error(err)
		}
		return { type: 'input' }
	}
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	generateQuestionsFromSchema(schema: ZodObjectDef): Record<string, Question> {
		return mapValues(
			schema.shape as unknown as Record<string, ZodType>,
			(value, key) => {
				const base = this.getTypeFromObjectDef(value)
				return {
					...base,
					name: key,
					message: `Enter ${capitalize(key.toString())}:`,
					//@ts-ignore
					transform: value.parse,
				}
			},
		)
	}

	async askUrl() {
		return new Promise<string>((resolve) =>
			this.readLine.question('Is there a URL to extract data from?', (answer) =>
				resolve(answer),
			),
		)
	}

	async run() {
		console.log('Schema Prompt Run')
		const url = await this.askUrl()
		const schema = this.resolveSchema()
		const questions = this.generateQuestionsFromSchema(schema)
		const output = await inquirer.prompt(questions, { ...this.answers, url })
		this.status = 'answered'
		Object.assign(this.answers, output)
		return output
	}
	status: PromptState
}
export const setupSchemaInquirerer = (plop: NodePlopAPI) => {
	plop.setPrompt('schema', SchemaPrompt)
	plop.setPrompt('openai', OpenAIInferer)
}
