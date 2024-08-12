import OpenAI from 'openai'
//
// export const openai = new OpenAI({
// 	apiKey: process.env.OPENAI_API_KEY,
// })

interface Props {
	system: string
	user: string
}

export const generateFromPrompt = async ({ system, user }: Props) => {
	const JSONInstruction =
		'Ensure your response is in the form of a JSON Object. '
	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	})
	const response = await openai.chat.completions.create({
		model: 'gpt-4o',
		messages: [
			{
				role: 'system',
				content: [
					{
						type: 'text',
						text: system,
					},
				],
			},
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: [user, JSONInstruction].join('\n'),
					},
				],
			},
		],
		temperature: 1,
		max_tokens: 500,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		response_format: {
			type: 'json_object',
		},
	})
	return response.choices[0]
}
