import { Options as _JsonpOptions } from 'fetch-jsonp'
import {
    AxiosResponse,
    Method as AxiosMethod,
    AxiosRequestConfig as AxiosOptions,
} from 'axios'

export {
    AxiosPromise,
    AxiosResponse,
    Method as AxiosMethod,
    AxiosRequestConfig as AxiosOptions,
} from 'axios'

/* -- types -- */
export type AnyFunction = (...args: any[]) => any
export type AnyPromiseFunction<T = any> = (...args: any[]) => Promise<T>

export type Mock = AnyFunction | any

export type ParamType = { [k: string]: string | number }

export type ApiConfig = WxApiConfig | WebApiConfig

export type PathListItem = BaseApiConfig & PathListItemOnly

/** 接口参数配置：参数名称数组、接口参数配置对象 */
export type ParamsConfig = string[] | ParamsObject

/**
 * 中间件函数
 */
export type Middleware<T = any> = (ctx: Ctx, next: () => Promise<any>) => Promise<U>

/**
 * 运行时配置
 */
export type RuntimeOptions = WxRuntimeOptions | WebRuntimeOptions

/**
 * 请求类型
 * - 即用哪个库发起请求目前支持：jsonp、axios、wx
 * - 不填则在 web 端默认使用 axios，小程序端默认用 wx
 */
export type ReqType = (
    | 'wx' | 'WX'
    | 'axios' | 'AXIOS'
    | 'jsonp' | 'JSONP'
)

/** 小程序的请求方法 */
export type WxMethod = (
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
)

/** 请求方法 */
export type Method = AxiosMethod | WxMethod

/* -- interfaces -- */

export interface JsonpOptions extends _JsonpOptions {
    charset?: string
}

/** 接口参数配置对象 */
export interface ParamsObject {
    [k: string]: (
        | string
        | number
        | { [k in 'required' | 'isRequired']?: boolean }
    )
}

/** 请求上下文对象 */
export interface CtxReq extends WxRuntimeOptions, PathListItemOnly, Required<Pick<PathListItemOnly, ['params']>> {
    args: object
    mock: Mock
    // 接口末端地址
    path: string
    method: Method
    apiName: string
    // 服务器地址
    baseUrl: string
    // 接口中间地址
    prefix: string
    reqType: ReqType
    reqParams: object
    reqFnParams: TuaApiReqFnOptions
    axiosOptions: AxiosOptions

    // jsonp
    callback: string
    callbackName: string
    jsonpOptions: JsonpOptions
    [k: string]: any
}
/** 响应上下文对象 */
export interface CtxRes extends AxiosResponse {
    data: any
    error?: Error
    [k: string]: any
}

/** 上下文对象 */
export interface Ctx {
    req: CtxReq
    res: CtxRes
    endTime: number
    reqTime: number
    startTime: number
    [k: string]: any
}

/** 基础接口配置对象 */
export interface BaseApiConfig {
    mock?: Mock
    method?: Method
    prefix?: string
    baseUrl?: string
    reqType?: ReqType
    afterFn?: <T = any, U = any>(args: [U?, Ctx?]) => T
    beforeFn?: () => Promise<any>
    middleware?: Middleware<Ctx>[]
    commonParams?: ParamType | null
    axiosOptions?: AxiosOptions
    jsonpOptions?: JsonpOptions
    useGlobalMiddleware?: boolean
}

/** 仅出现在单个接口配置对象的字段 */
export interface PathListItemOnly {
    path: string
    name?: string
    params?: ParamsConfig
}

// for web
export interface WebApiConfig extends BaseApiConfig {
    pathList: (PathListItem)[]
}

// for wechat miniprogram only
export interface WxApiConfigOnly {
    isShowLoading?: boolean
    showLoadingFn?: AnyFunction
    hideLoadingFn?: AnyFunction
}
export interface WxApiConfig extends BaseApiConfig, WxApiConfigOnly {
    pathList: (PathListItem & WxApiConfigOnly)[]
}

/** 仅出现在运行时配置对象的字段 */
export interface RuntimeOptionsOnly {
    apiName: string
    fullPath: string
    callback: string
    callbackName: string
}
export interface WxRuntimeOptions extends WxApiConfigOnly, WebRuntimeOptions {}
export interface WebRuntimeOptions extends BaseApiConfig, Partial<RuntimeOptionsOnly> {}

// 接口总配置对象
export interface Apis { [k: string]: SyncFnMap }
// 同步函数对象
export interface SyncFnMap { [k: string]: ApiFn }
// 请求函数对象
export interface ApiFn {
    key: string
    mock?: Mock
    params: ParamsConfig
    <T = any, U = object | void>(
        params?: U,
        runtimeOptions?: RuntimeOptions
    ): Promise
}

/**
 * 初始化时的默认配置
 */
export interface TuaApiConstructorOptions {
    /** 接口基础地址，例如 https://example.com/api/ */
    baseUrl?: string
    reqType?: ReqType
    middleware?: Middleware<Ctx>[]
    /** 透传 axios 配置参数 */
    axiosOptions?: AxiosOptions
    /** 透传 fetch-jsonp 配置参数 */
    jsonpOptions?: JsonpOptions
    /** 出错时的默认返回数据 */
    defaultErrorData?: any
}

/**
 * 发起请求时能获取的参数
 */
export interface TuaApiReqFnOptions {
    url: string
    mock: Mock
    header: object
    method: Method | WxMethod
    fullUrl: string
    reqType: ReqType
    callback: string
    reqParams: object
    callbackName: string
    axiosOptions: AxiosOptions
    jsonpOptions: JsonpOptions
}
