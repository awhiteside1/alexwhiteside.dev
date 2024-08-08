import { globbySync } from 'globby'
import type { ActionType } from 'plop'
import { dash, objectify, sift } from 'radash'
import type { PlopSetupFn } from '../helpers/types'

const getCOllectionTypes = (path?: string) => {
	const result = globbySync(sift(['src/content', path, '*']).join('/'), {
		onlyDirectories: true,
		expandDirectories: false,
		objectMode: true,
	})
	return objectify(
		result,
		(item) => item.name,
		(item) => item.dirent,
	)
}

export const setupContentTemplate: PlopSetupFn = (plop) => {
	plop.setGenerator('content', {
		actions: (data = {}): Array<ActionType> => {
			const actions: ActionType[] = []
			const slug = dash(data.entry)
			const file = `${slug}.mdx`
			const path = sift([
				'../src/content',
				data.collection,
				data.subpath,
				file,
			]).join('/')

			actions.push({
				type: 'add',
				path: path,
				skipIfExists: true,
				templateFile: 'content/content.mdx.hbs',
			})
			return actions
		},
		description: 'Creates a new Content Entry file',
		prompts: [
			{
				type: 'list',
				choices: Object.keys(getCOllectionTypes()),
				name: 'collection',
				message: 'What kind of content?',
			},
			{
				type: 'list',
				name: 'subpath',
				message: 'What kind?',
				choices: (answers) => {
					const types = getCOllectionTypes(answers.collection)
					return Object.keys(types)
				},
				when: (answers) =>
					Object.keys(getCOllectionTypes(answers.collection)).length > 0,
			},
			{
				type: 'input',
				name: 'entry',
				message: 'Entry Name?',
			},
			{
				type: 'schema',
				name: 'schema-data',
				//@ts-ignore
				collectionKey: 'collection',
			},
		],
	})
}
