export class PromiseWorker {
	private actionHandlerMap = new Map()
	private sequence = 0
	constructor(private worker: Worker) {
		worker.onmessage = this.onmessage.bind(this)
		worker.onerror = console.error
		worker.onmessageerror = console.error
	}

	onmessage(e: MessageEvent) {
		const { id, result } = e.data
		console.log('onmessage', id, result)
		if (!this.actionHandlerMap.has(id)) return
		this.actionHandlerMap.get(id).call(this, result)
		this.actionHandlerMap.delete(id)
	}
	postMessage(action: Record<string, string>) {
		const id = this.sequence++
		console.log('posted', id, action)
		return new Promise((resolve, reject) => {
			const message = {
				id,
				action,
			}
			this.worker.postMessage(message)
			this.actionHandlerMap.set(id, (response: unknown) => {
				resolve(response)
			})
		})
	}
}
