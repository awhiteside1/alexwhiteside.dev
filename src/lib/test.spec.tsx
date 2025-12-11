import { getWorkContent } from './getWorkContent'

describe('thign', () => {
	it('should date', async () => {
		const _s = await getWorkContent()
		expect(_s).toBeDefined()
	})
})
