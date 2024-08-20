import fs from 'node:fs/promises'
import { join } from 'node:path'
import type { VercelRequest } from '@vercel/node'
import { uid } from 'radash'
import { describe, it } from 'vitest'
import handler from './page'

describe('', () => {
	it('should sdfds', async () => {
		// @ts-ignore
		const request: VercelRequest = {
			// @ts-ignore
			url: new URL(
				`https://alexwhiteside.dev/dsfjshfk?${new URLSearchParams({
					kind: 'page',
					title: 'Career and Background',
					description: '10+ years of experience at companies large and small',
				}).toString()}`,
			),
		}
		const response = await handler(request)
		if (!response.body) return
		const fileName = `${uid(10)}.png`
		const folder = await fs.mkdtemp('/tmp/')
		const path = join(folder, fileName)
		await fs.writeFile(path, Buffer.from(await response.arrayBuffer()))
		console.log('\n')
		console.log(path)
	})
})
