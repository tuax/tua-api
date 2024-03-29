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

export const fakeGetApi: {
	'acp': ReqFnWithAnyParams
	'rta': ReqFnWithAnyParams
	'irt': ReqFnWithAnyParams
	'afterData': ReqFnWithAnyParams
	'mockFnData': ReqFnWithAnyParams
	'noAfterData': ReqFnWithAnyParams
	'jsonpOptions': ReqFnWithAnyParams
	'beforeFnCookie': ReqFnWithAnyParams
	'mockObjectData': ReqFnWithAnyParams
	'empty-array-params': ReqFnWithAnyParams
	'ap': ReqFn & {
		<T = Result>(
			params: { param1?: any, param2?: any },
			options?: RuntimeOptions
		): Promise<T>
	}
	'op': ReqFn & {
		<T = Result>(
			params: { param1?: any, param2?: any, param3: any },
			options?: RuntimeOptions
		): Promise<T>
	}
}

export const fakePostApi: {
	'ct': ReqFnWithAnyParams
	'oh': ReqFnWithAnyParams
	'pj': ReqFnWithAnyParams
	'eap': ReqFnWithAnyParams
	'hap': ReqFnWithAnyParams
	'ap': ReqFn & {
		<T = Result>(
			params: { param1?: any, param2?: any },
			options?: RuntimeOptions
		): Promise<T>
	}
	'op': ReqFn & {
		<T = Result>(
			params: { param1?: any, param2?: any, param3: any },
			options?: RuntimeOptions
		): Promise<T>
	}
}

export const fakeFnApi: {
	'fp': ReqFn & {
		<T = Result>(
			params: { t?: any },
			options?: RuntimeOptions
		): Promise<T>
	}
}
