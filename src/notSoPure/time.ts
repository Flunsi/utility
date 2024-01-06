import { def, undef } from '../index'


// sleep
export async function sleep(sleepMS: number) {
	await new Promise(resolve => setTimeout(resolve, sleepMS))
}

// DelayedInvoker
export class DelayedInvoker {
	constructor(fn?: () => void, delayMillis?: number) {
		this.timer = undefined
		this.fn = fn
		this.delayMillis = delayMillis
	}


	public trigger({ fn, delayMillis }: { fn?: () => void, delayMillis?: number } = {}) {
		if (def(fn))
			this.fn = fn
		if (def(delayMillis))
			this.delayMillis = delayMillis

		if (undef(this.fn) || undef(this.delayMillis))
			throw new Error('ERROR_DelayedInvoker.trigger_1: Called without fn or delayMS')

		clearTimeout(this.timer)
		this.timer = setTimeout(this.fn, this.delayMillis)
	}


	public clear() {
		clearTimeout(this.timer)
	}


	/*****************************************************************************************************/
	//   Private
	/*****************************************************************************************************/
	private timer: number | undefined
	private fn: (() => void) | undefined
	private delayMillis: number | undefined
}
