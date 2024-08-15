import { extractFromLink } from './extractFromLink.tsx'

describe('OpenAI', () => {
	it('should Work', async () => {
		console.log(await extractFromLink('https://every-layout.dev/'))
	})
})
