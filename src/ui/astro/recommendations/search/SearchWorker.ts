interface SharedWorkerGlobalScope {
	onconnect: (event: MessageEvent) => void
}

const _self = self as unknown as SharedWorkerGlobalScope
interface RepoData {
	repos: string[]
	original: string
	_distance: number
}
const pending = new Map<string, Promise<void>>()
const map = new Map<string, RepoData[]>()

let invokeApi = async (query: string) => {
	const response = await fetch(
		`/api/related?${new URLSearchParams({ term: query })}`,
	)
	return response.json()
}

if (location.host.includes('local')) {
	invokeApi = async (query) => {
		return [{ repos: ['test'], original: query, _distance: 0 }]
	}
}

addEventListener('message', (e) => {
	console.log('Worker Received', e.data)
	const id = e.data.id
	const query = e.data.action.query

	if (map.has(query)) {
		console.debug('cached value')
		postMessage({ id, result: map.get(query) })
	} else if (pending.has(query)) {
		console.debug('pending value')
		pending.get(query)?.then(() => {
			postMessage({ id, result: map.get(query) })
		})
	} else {
		console.debug('new value')
		const promise = new Promise<void>((resolve) => {
			invokeApi(query).then((result) => {
				map.set(query, result)
				pending.delete(query)
				postMessage({ id, result: map.get(query) })
				resolve()
			})
		})
		pending.set(query, promise)
	}
})
