type ParamType<T> = T extends (option: infer P) => any ? P : T
type ResultType<T> = ParamType<SuccessCallback<T>>
// @ts-ignore 类型“"success"”无法用于索引类型“ParamType<T>”。
type SuccessCallback<T> = ParamType<T>['success']

/**
 * 将小程序 api promise 化
 * @param fn 小程序原生异步 api
 */
function promisifyWxApi <Fn> (fn: Fn) {
    return function (args?: ParamType<Fn>) {
        if (typeof fn !== 'function') {
            throw TypeError('fn must be a function')
        }

        return new Promise<ResultType<Fn>>((success, fail) => {
            fn(Object.assign({}, { success, fail }, args))
        })
    }
}

export {
    promisifyWxApi,
}
