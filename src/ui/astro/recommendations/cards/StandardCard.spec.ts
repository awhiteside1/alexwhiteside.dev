import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const componentPath = path.join(
	process.cwd(),
	'src/ui/astro/recommendations/cards/StandardCard.astro',
)

const componentSource = readFileSync(componentPath, 'utf-8')

describe('StandardCard layout stability', () => {
	it('includes intrinsic image dimensions to avoid layout shift', () => {
		const imgTag = componentSource.match(/<img[^>]*>/)?.[0]

		expect(imgTag).toBeTruthy()
		expect(imgTag).toMatch(/width="\d+"/)
		expect(imgTag).toMatch(/height="\d+"/)
	})
})
