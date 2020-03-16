
import * as R from 'remeda'
import koaCompose from 'koa-compose'

import {
    Ctx,
    CtxRes,
    ReqType,
    WxMethod,
    SyncFnMap,
    ApiConfig,
    Middleware,
    AxiosMethod,
    ParamsObject,
    AxiosOptions,
    JsonpOptions,
    PathListItem,
    TuaApiReqFnOptions,
    TuaApiConstructorOptions,
} from './types'

import { version } from '../package.json'
import { ERROR_STRINGS, VALID_REQ_TYPES } from './constants'
import {
    isWx,
    logger,
    apiConfigToReqFnParams,
} from './utils'
import {
    getWxPromise,
    getAxiosPromise,
    getFetchJsonpPromise,
} from './adapters'
import {
    formatResDataMiddleware,
    recordReqTimeMiddleware,
    setReqFnParamsMiddleware,
    recordStartTimeMiddleware,
    formatReqParamsMiddleware,
} from './middlewareFns'

logger.log(`Version: ${version}`)

class TuaApi {
    public baseUrl: string
    public reqType: ReqType
    public middleware: Middleware<Ctx>[]
    public axiosOptions: AxiosOptions
    public jsonpOptions: JsonpOptions
    public defaultErrorData: any

    constructor (options: TuaApiConstructorOptions = {}) {
        const {
            baseUrl = '',
            reqType = isWx() ? 'wx' : 'axios',
            middleware = [],
            axiosOptions = {},
            jsonpOptions = {},
            defaultErrorData = { code: 999, msg: '出错啦！' },
        } = options

        this.baseUrl = baseUrl
        this.reqType = reqType
        this.middleware = middleware
        this.axiosOptions = axiosOptions
        this.jsonpOptions = jsonpOptions
        this.defaultErrorData = defaultErrorData

        this._checkReqType(this.reqType)

        return this
    }

    /**
     * 添加一个中间件函数
     * @param fn 中间件函数
     */
    public use (fn: Middleware<Ctx>) {
        if (typeof fn !== 'function') {
            throw TypeError(ERROR_STRINGS.middleware)
        }
        this.middleware.push(fn)

        return this
    }

    /**
     * 根据 apiConfig 生成请求函数组成的 map
     * @param apiConfig 接口配置对象
     * @returns syncFnMap 包含多个接口函数的对象
     */
    public getApi (apiConfig: ApiConfig): SyncFnMap {
        return R.pipe(
            apiConfig,
            apiConfigToReqFnParams,
            R.map(this._getOneReqMap.bind(this)),
            R.mergeAll,
        ) as SyncFnMap
    }

    _reqFn (options: TuaApiReqFnOptions) {
        const {
            url,
            mock,
            header,
            method: _method,
            fullUrl,
            reqType: _reqType,
            reqParams: data,
            callback,
            callbackName,
            axiosOptions,
            jsonpOptions,
            ...rest
        } = options

        // check type
        this._checkReqType(_reqType)

        // mock data
        if (mock) {
            const resData = typeof mock === 'function'
                ? mock(data)
                : { ...mock }

            return Promise.resolve({ data: resData })
        }

        const method = _method.toUpperCase()
        const reqType = _reqType.toUpperCase() as ReqType

        if (reqType === 'WX') {
            const m = method as WxMethod
            return getWxPromise({ url, fullUrl, data, method: m, header, ...rest })
        }

        if (reqType === 'AXIOS' || method === 'POST') {
            const m = method as AxiosMethod
            const isGet = method === 'GET'
            const params = {
                ...axiosOptions,
                url: isGet ? fullUrl : url,
                data: isGet ? undefined : data,
                method: m,
                headers: header,
            }

            return getAxiosPromise(params)
        }

        // 防止接口返回非英文时报错
        jsonpOptions.charset = jsonpOptions.charset || 'UTF-8'

        jsonpOptions.jsonpCallback = callback || jsonpOptions.jsonpCallback
        jsonpOptions.jsonpCallbackFunction = callbackName || jsonpOptions.jsonpCallbackFunction

        return getFetchJsonpPromise({ url: fullUrl, jsonpOptions })
    }

    /**
     * 检查 reqType 是否合法
     */
    _checkReqType (reqType: any) {
        if (VALID_REQ_TYPES.indexOf(reqType) !== -1) return

        throw TypeError(ERROR_STRINGS.reqTypeFn(reqType))
    }

    /**
     * 组合生成中间件函数
     * @param middleware
     * @param useGlobalMiddleware 是否使用全局中间件
     */
    _getMiddlewareFn <T> (middleware: Middleware<T>[], useGlobalMiddleware: boolean) {
        const middlewareFns = useGlobalMiddleware
            ? this.middleware.concat(middleware)
            : middleware

        return koaCompose([
            // 记录开始时间
            recordStartTimeMiddleware,
            // 格式化生成请求参数
            formatReqParamsMiddleware,
            // 业务侧中间件函数数组
            ...middlewareFns,
            // 生成 _reqFn 参数
            setReqFnParamsMiddleware,
            // 统一转换响应数据为对象
            formatResDataMiddleware,
            // 记录结束时间
            recordReqTimeMiddleware,
            // 发起请求
            (ctx, next) => next()
                .then(() => this._reqFn(ctx.req.reqFnParams))
                // 暂存出错，保证 afterFn 能执行（finally）
                .catch((error) => ({
                    // 浅拷贝一份默认出错值
                    data: { ...this.defaultErrorData },
                    error,
                }))
                .then((res: CtxRes) => { ctx.res = res }),
        ])
    }

    /**
     * 接受 api 对象，返回待接收参数的单个 api 函数的对象
     * @return 以 apiName 为 key，请求函数为值的对象
     */
    _getOneReqMap (options: PathListItem) {
        const {
            mock,
            name,
            path,
            method: _method,
            prefix,
            params = {},
            afterFn = ([x]: any[]) => x,
            beforeFn = Promise.resolve.bind(Promise),
            middleware = [],
            useGlobalMiddleware = true,
            ...rest
        } = options

        // 优先使用 name
        const apiName = name || path
        // 默认值
        const method = _method || 'get'

        // 合并全局默认值
        rest.baseUrl = rest.baseUrl || this.baseUrl
        rest.reqType = rest.reqType || this.reqType
        rest.axiosOptions = rest.axiosOptions
            ? { ...this.axiosOptions, ...rest.axiosOptions }
            : this.axiosOptions
        rest.jsonpOptions = rest.jsonpOptions
            ? { ...this.jsonpOptions, ...rest.jsonpOptions }
            : this.jsonpOptions

        /**
         * 被业务侧调用的函数
         * @param args 接口参数（覆盖默认值）
         * @param runtimeOptions 运行时配置
         */
        const apiFn = (args: any, runtimeOptions = {}) => {
            args = args || {}

            // 最终的运行时配置，runtimeOptions 有最高优先级
            const runtimeParams = {
                path,
                params,
                prefix,
                method,
                apiName,
                fullPath: `${prefix}/${path}`,
                ...rest,
                ...runtimeOptions,
            }

            // 请求的上下文信息
            const ctx: Ctx = {
                // @ts-ignore
                req: { args, mock: apiFn.mock, ...runtimeParams },
            }

            // 执行完 beforeFn 后执行的函数
            const beforeFnCb = (rArgs: { header?: object, params?: ParamsObject } = {}) => {
                // 传递请求头
                if (rArgs.header) {
                    ctx.req.reqFnParams = {
                        ...ctx.req.reqFnParams,
                        header: rArgs.header,
                    }
                }

                if (!rArgs.params) return

                // 合并 beforeFn 中传入的 params
                ctx.req.params = Array.isArray(params)
                    ? rArgs.params
                    // 可以通过给 beforeFn 添加 params 返回值来添加通用参数
                    : { ...params, ...rArgs.params }
            }

            // 中间件函数
            const middlewareFn = this._getMiddlewareFn(middleware, useGlobalMiddleware)

            return beforeFn()
                .then(beforeFnCb)
                .then(() => middlewareFn(ctx))
                .then(() => afterFn([ctx.res.data, ctx]))
                .then((data) => ctx.res.error
                    ? Promise.reject(ctx.res.error)
                    : data || ctx.res.data,
                )
        }

        apiFn.key = `${prefix}/${apiName}`
        apiFn.mock = mock
        apiFn.params = params

        return { [apiName]: apiFn }
    }
}

export default TuaApi
export * from './exportUtils'
