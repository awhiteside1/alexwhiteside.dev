// @ts-ignore
import { PGlite } from 'https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/index.js'
//import { PGlite } from '@electric-sql/pglite'
// @ts-ignore
import { worker } from '@electric-sql/pglite/worker'

worker({
	async init(options) {
		const meta = options.meta
		// Do something with additional metadata.
		console.log('initializing')
		const dump = await (await fetch('/data/dump')).blob()
		// or even run your own code in the leader along side the PGlite
		return new PGlite({
			loadDataDir: dump,
			extensions: {
				vector: new URL(
					'https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.2.3/dist/vector.tar.gz',
				),
			},
		})
	},
}).catch(console.error)
