import { Options as JsonpOptions } from 'fetch-jsonp'
import {
    AxiosResponse,
    AxiosRequestConfig as AxiosOptions,
} from 'axios'

/* -- types -- */
export type AnyFunction = (...args: any[]) => any
export type AnyPromiseFunction<T = any> = (...args: any[]) => Promise<T>

export type Mock = AnyFunction | any

export type ApiConfig = WxApiConfig | WebApiConfig

export type ParamsConfig = string[] | ParamsObject

export type Middleware<T> = (ctx: T, next: () => Promise<any>) => Promise<any>

export type RuntimeOptions = WxRuntimeOptions | WebRuntimeOptions

export type ReqType = (
    | 'wx' | 'WX'
    | 'axios' | 'AXIOS'
    | 'jsonp' | 'JSONP'
)

export type Method = (
    | 'get' | 'GET'
    | 'put' | 'PUT'
    | 'head' | 'HEAD'
    | 'post' | 'POST'
    | 'trace' | 'TRACE'
    | 'delete' | 'DELETE'
    | 'connect' | 'CONNECT'
    | 'options' | 'OPTIONS'
)

/* -- interfaces -- */

export interface ParamsObject {
    [k: string]: (
        | { required: boolean }
        | { isRequired: boolean }
        | any
    )
}

export interface CtxReq {
    host: string
    mock: Mock
    type: Method
    path: string
    prefix: string
    reqType: ReqType
    reqParams: object
    reqFnParams: object
    callbackName: string
    axiosOptions: AxiosOptions
    jsonpOptions: JsonpOptions
    [k: string]: any
}
export interface CtxRes extends AxiosResponse {
    data: any
    error?: Error
    [k: string]: any
}

export interface Ctx {
    req: CtxReq
    res: CtxRes
    endTime: number
    reqTime: number
    startTime: number
    [k: string]: any
}

export interface BaseApiConfig {
    mock?: Mock
    host?: string
    type?: Method
    prefix?: string
    reqType?: ReqType
    afterFn?: <T = any, U = any>(args: [U?, Ctx?]) => Promise<T>
    beforeFn?: <T = any>() => Promise<T>
    middleware?: Middleware<Ctx>[]
    commonParams?: object
    axiosOptions?: AxiosOptions
    jsonpOptions?: JsonpOptions
    useGlobalMiddleware?: boolean
    [k: string]: any
}

// for web
export interface WebApiConfig extends BaseApiConfig {
    pathList: (BaseApiConfig & {
        path: string
        name?: string
        params?: ParamsConfig
    })[]
}

// for wechat miniprogram
export interface WxApiConfig extends WebApiConfig {
    isShowLoading?: boolean
    showLoadingFn?: AnyFunction
    hideLoadingFn?: AnyFunction
}

export interface RuntimeOptionsOnly {
    apiName?: string
    fullPath?: string
    callbackName?: string
}
export interface WxRuntimeOptions extends WxApiConfig, RuntimeOptionsOnly {}
export interface WebRuntimeOptions extends WebApiConfig, RuntimeOptionsOnly {}

export interface Api {
    key: string
    mock: Mock
    params: ParamsConfig
    <T = object, U = object | void>(
        params?: U,
        runtimeOptions?: RuntimeOptions
    ): Promise<T>
}
export interface Apis { [k: string]: SyncFnMap }
export interface SyncFnMap { [k: string]: Api }

export interface TuaApiClass {
    new (args?: {
        host?: string
        reqType?: string
        middleware?: Middleware<Ctx>[]
        axiosOptions?: AxiosOptions
        jsonpOptions?: JsonpOptions
        defaultErrorData?: any
    }): TuaApiInstance
}

export interface TuaApiInstance {
    use: (fn: Middleware<Ctx>) => TuaApiInstance
    getApi: (apiConfig: ApiConfig) => SyncFnMap
}

/* -- export utils -- */

export function getSyncFnMapByApis(apis: Apis): SyncFnMap
export function getPreFetchFnKeysBySyncFnMap(syncFnMap: SyncFnMap): Api[]

/* -- export default -- */

declare const TuaApi: TuaApiClass
export default TuaApi
