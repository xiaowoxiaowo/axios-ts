import { CancelExecutor, CancelTokenSource, Canceler } from './../types/index'
import Cancel from './Cancel'

// 类既可以当成一个值，也可以当成一个类型
interface ResolvePromise {
	(reason?: Cancel): void
}

export default class CancelToken {
	promise: Promise<Cancel>
	reason?: Cancel

	constructor(executor: CancelExecutor) {
		let resolvePromise: ResolvePromise

		this.promise = new Promise<Cancel>(resolve => {
			// 之后调用resolvePromise这个变量，就相当于执行了promise的resolve方法
			resolvePromise = resolve
		})

		executor(message => {
			if (this.reason) {
				return
			}
			this.reason = new Cancel(message)
			resolvePromise(this.reason)
		})
	}

	throwIfRequested() {
		if (this.reason) {
			throw this.reason
		}
	}

	static source(): CancelTokenSource {
		let cancel!: Canceler
		const token = new CancelToken(c => {
			cancel = c
		})
		return {
			cancel,
			token
		}
	}
}

/*
const CancelToken = axios.CancelToken
let cancel

axios.get('/user', {
	cancelToken: new CancelToken(function executor(c) {
		cancel = c
	})
})

cancel()
*/