
import koaCompose from 'koa-compose'
import { Options as JsonpOptions } from 'fetch-jsonp'
import { AxiosRequestConfig as AxiosOptions } from 'axios'

import { version } from '../package.json'
import { ERROR_STRINGS } from './constants'
import {
  Ctx,
  CtxReq,
  CtxRes,
  ReqType,
  ApiConfig,
  SyncFnMap,
  Middleware,
  SelfApiConfig,
  RuntimeOptions,
  AnyPromiseFunction,
  DefaultApiConfig,
} from './interfaces'
import {
  map,
  pipe,
  isWx,
  runFn,
  logger,
  mergeAll,
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
  formatReqArgsMiddleware,
  setReqFnParamsMiddleware,
  recordStartTimeMiddleware,
} from './middlewareFns'

class TuaApi {
  baseUrl: string
  reqType: ReqType
  middleware: Middleware<Ctx>[]
  customFetch: AnyPromiseFunction
  axiosOptions: AxiosOptions
  jsonpOptions: JsonpOptions
  defaultErrorData: any

  constructor ({
    baseUrl,
    reqType,
    middleware = [],
    customFetch,
    axiosOptions = {},
    jsonpOptions = {},
    defaultErrorData = { code: 999, msg: '出错啦！' },
  }: DefaultApiConfig = {}) {
    logger.log(`Version: ${version}`)

    this.baseUrl = baseUrl
    this.middleware = middleware
    this.customFetch = customFetch
    this.axiosOptions = axiosOptions
    this.jsonpOptions = jsonpOptions
    this.defaultErrorData = defaultErrorData

    if (customFetch) {
      this.reqType = 'custom';
    } else {
      this.reqType = reqType ?? isWx() ? 'wx' : 'axios';
    }

    if (reqType && reqType !== 'custom' && customFetch) {
      throw TypeError(ERROR_STRINGS.reqTypeAndCustomFetch)
    }

    return this
  }

  /**
   * 添加一个中间件函数
   * @param {function} fn
   * @return {object} self
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
   * @param {object} apiConfig
   * @return {object}
   */
  public getApi (apiConfig: ApiConfig): SyncFnMap {
    return pipe(
      apiConfigToReqFnParams,
      map(this._getOneReqMap.bind(this)),
      mergeAll,
    )(apiConfig)
  }

  /**
   * 根据 reqType 和 type 决定调用哪个库
   * @param {object} options
   * @param {Object|Function} options.mock 模拟的响应数据或是生成数据的函数
   * @param {string} options.url 接口地址
   * @param {string} options.method 接口请求类型 get/post...
   * @param {string} options.fullUrl 完整接口地址
   * @param {string} options.reqType 使用什么工具发(axios/jsonp/wx)
   * @param {object} options.reqArgs 请求参数
   * @param {object} options.header 请求的 header
   * @param {function} [options.customFetch] 自定义请求函数
   * @param {object} options.axiosOptions 透传 axios 配置参数
   * @param {object} options.jsonpOptions 透传 fetch-jsonp 配置参数
   * @return {Promise}
   */
  private _reqFn (options: {
    url: string,
    mock?: any,
    method: string,
    header?: any,
    headers?: any,
    fullUrl: string,
    reqType: ReqType,
    reqArgs: any,
    axiosOptions?: any,
    jsonpOptions?: any,
    customFetch?: any
  }) {
    const {
      url,
      mock,
      header: _header,
      headers: _headers,
      method: _method = 'get',
      fullUrl,
      reqType: _reqType,
      reqArgs: data,
      axiosOptions,
      jsonpOptions,
      ...rest
    } = options

    const header = _header ?? _headers;

    // use mock data
    if (mock) {
      const resData = { ...runFn(mock, data) }

      return Promise.resolve({ data: resData })
    }

    const method = _method.toLowerCase()
    const reqType = _reqType.toLowerCase()

    if (reqType === 'custom') {
      return rest.customFetch({ url, data, method, header, ...rest })
    }

    if (reqType === 'wx') {
      return getWxPromise({ url, fullUrl, data, method, header, ...rest })
    }

    if (reqType === 'axios' || method === 'post') {
      const params = {
        ...axiosOptions,
        url,
        data: method === 'get' ? {} : data,
        method,
        params: data,
        headers: header,
      }

      return getAxiosPromise(params)
    }

    // 防止接口返回非英文时报错
    jsonpOptions.charset = jsonpOptions.charset || 'UTF-8'

    return getFetchJsonpPromise({ url: fullUrl, jsonpOptions })
  }

  /**
   * 组合生成中间件函数
   * @param {function[]} middleware
   * @param {Boolean} useGlobalMiddleware 是否使用全局中间件
   */
  private _getMiddlewareFn (middleware, useGlobalMiddleware) {
    const middlewareFns = useGlobalMiddleware
      ? this.middleware.concat(middleware)
      : middleware

    return koaCompose([
      // 记录开始时间
      recordStartTimeMiddleware,
      // 格式化生成请求参数
      formatReqArgsMiddleware,
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
        .then(res => { ctx.res = res }),
    ])
  }

  private mergeByDefault(rest) {
    if (rest.reqType && rest.customFetch) {
      if (rest.reqType.toLowerCase() !== 'custom') {
        logger.warn(ERROR_STRINGS.reqTypeAndCustomFetch)
      }
      rest.reqType = 'custom'
    } else if (rest.customFetch || this.customFetch) {
      // 没有配置 reqType，但配了公共配置或默认配置的 customFetch
      rest.reqType = 'custom'
    } else {
      // 没有配置 customFetch
      rest.reqType = rest.reqType || this.reqType
    }

    rest.customFetch = rest.customFetch || this.customFetch
    rest.axiosOptions = rest.axiosOptions
      ? { ...this.axiosOptions, ...rest.axiosOptions }
      : this.axiosOptions
    rest.jsonpOptions = rest.jsonpOptions
      ? { ...this.jsonpOptions, ...rest.jsonpOptions }
      : this.jsonpOptions
  }

  /**
   * 接受 api 对象，返回待接收参数的单个 api 函数的对象
   * @param {object} options
   * @param {string} options.method 接口请求类型 get/post...
   * @param {Object|Function} options.mock 模拟的响应数据或是生成数据的函数
   * @param {string} options.name 自定义的接口名称
   * @param {string} options.path 接口结尾路径
   * @param {String[] | object} options.params 接口参数数组
   * @param {string} options.prefix 接口前缀
   * @param {function} options.afterFn 在请求完成后执行的钩子函数（将被废弃）
   * @param {function} options.beforeFn 在请求发起前执行的钩子函数（将被废弃）
   * @param {function[]} options.middleware 中间件函数数组
   * @param {function} [options.customFetch] 自定义请求函数
   * @param {Boolean} options.useGlobalMiddleware 是否使用全局中间件
   * @param {string} options.baseUrl 服务器地址
   * @param {string} options.reqType 使用什么工具发
   * @param {object} options.axiosOptions 透传 axios 配置参数
   * @param {object} options.jsonpOptions 透传 fetch-jsonp 配置参数
   * @return {object} 以 name 为 key，请求函数为值的对象
   */
  private _getOneReqMap (options: SelfApiConfig) {
    const {
      path,
      prefix,
      name = path,
      mock,
      method = 'get',
      baseUrl = this.baseUrl,
      beforeFn = Promise.resolve.bind(Promise),
      middleware = [],
      afterFn = ([x]) => x,
      params: rawParams = {},
      useGlobalMiddleware = true,
      ...rest
    } = options;

    /* 合并全局默认值 */
    this.mergeByDefault(rest);

    /**
     * 被业务侧调用的函数
     * @param reqArgs 接口参数（覆盖默认值）
     * @param runtimeOptions 运行时配置
     * @return {Promise}
     */
    const apiFn = (
      reqArgs: any = {},
      runtimeOptions: RuntimeOptions = {}
    ) => {
      const params = runFn(rawParams, reqArgs)

      // 最终的运行时配置，runtimeOptions 有最高优先级
      const runtimeParams: RuntimeOptions = {
        path,
        name,
        params,
        prefix,
        ...rest,
        ...runtimeOptions,
      }

      // 请求的上下文信息
      const ctx: {
        req: Partial<CtxReq>,
        res: Partial<CtxRes>,
      } = {
        req: {
          reqArgs,
          method,
          baseUrl,
          mock: apiFn.mock,
          reqFnParams: {},
          ...runtimeParams,
        },
        res: {},
      }

      // 中间件函数
      const middlewareFn = this._getMiddlewareFn(middleware, useGlobalMiddleware)

      return beforeFn(ctx)
        .then(() => middlewareFn(ctx))
        .then(() => afterFn([ctx.res.data, ctx as Ctx]))
        .then((data) => ctx.res.error
          ? Promise.reject(ctx.res.error)
          : data || ctx.res.data,
        )
    }

    apiFn.key = `${prefix}/${name}`
    apiFn.mock = mock
    apiFn.params = rawParams

    return { [name]: apiFn }
  }
}

export default TuaApi
export * from './exportUtils'
