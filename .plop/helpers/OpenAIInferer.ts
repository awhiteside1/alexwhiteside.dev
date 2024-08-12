import type {ReadLine} from "node:readline";
import {extractFromLink} from "./openai/extractFromLink.tsx";

export class OpenAIInferer {
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

	async askUrl() {
		return new Promise<string>((resolve) =>
			this.readLine.question('Is there a URL to extract data from?', (answer) =>
				resolve(answer),
			),
		)
	}
	async run() {
		const url = await this.askUrl()

		const gptResponse = await extractFromLink(url)
		if (gptResponse === null) return
		const values = JSON.parse(gptResponse)
		Object.assign(this.answers, values)

		this.status = 'answered'

		return this.answers
	}
	status: string
}
