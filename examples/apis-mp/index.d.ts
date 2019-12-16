// default response result
interface Result { code: number, data: any, msg?: string }
interface ReqFn {
	key: string
	mock: any
	params: object | string[]
}
interface RuntimeOptions {
	// for jsonp
	callbackName?: string
	[key: string]: any
}
interface ReqFnWithAnyParams extends ReqFn {
	<T = Result>(params?: any, options?: RuntimeOptions): Promise<T>
}

export const mockApi: {
	'foo': ReqFnWithAnyParams
	'bar': ReqFnWithAnyParams
	'null': ReqFnWithAnyParams
}

export const fakeWxApi: {
	'fail': ReqFnWithAnyParams
	'typeGet': ReqFnWithAnyParams
	'noBeforeFn': ReqFnWithAnyParams
	'navLoading': ReqFnWithAnyParams
	'anotherFail': ReqFnWithAnyParams
	'hideLoading': ReqFnWithAnyParams
	'unknownType': ReqFnWithAnyParams
	'arrayData': ReqFn & {
		<T = Result>(
			params: { param1?: any, param2?: any },
			options?: RuntimeOptions
		): Promise<T>
	}
	'objectData': ReqFn & {
		<T = Result>(
			params: { param1?: any, param2?: any, param3: any },
			options?: RuntimeOptions
		): Promise<T>
	}
}
