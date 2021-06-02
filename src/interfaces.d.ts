import { Options as JsonpOptions } from 'fetch-jsonp'
import {
  AxiosResponse,
  AxiosRequestConfig as AxiosOptions,
  Method,
} from 'axios'
import { ParameterLocation } from 'openapi3-ts'

/* -- types -- */
export type AnyFunction = (...args: any[]) => any
export type AnyPromiseFunction<T = any> = (...args: any[]) => Promise<T>

export type Mock = AnyFunction | any

export type ApiConfig = WxApiConfig | WebApiConfig

export type ParamsConfig = string[] | ParamsObject | ((args?: object) => object)

export type Middleware<T> = (ctx: T, next: () => Promise<any>) => Promise<any>

export type RuntimeOptions = WxRuntimeOptions | WebRuntimeOptions

export type ReqType = (
  | 'wx' | 'WX'
  | 'axios' | 'AXIOS'
  | 'jsonp' | 'JSONP'
  | 'custom' | 'CUSTOM'
)

/* -- interfaces -- */

export interface ParamsObject {
  [k: string]: (
    | {
      in?: ParameterLocation,
      required: boolean,
    }
    | {
      in?: ParameterLocation,
      isRequired: boolean,
    }
    | string
    | number
  )
}

export interface CtxReq {
  args: any
  mock: Mock
  params: any
  path: string
  name: string
  method: Method
  prefix: string
  baseUrl: string
  reqArgs: any
  reqType: ReqType
  reqFnParams: any
  axiosOptions?: AxiosOptions
  jsonpOptions?: JsonpOptions
  [k: string]: any
}
export interface CtxRes extends AxiosResponse {
  data: any
  rawData: any
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

export interface DefaultApiConfig {
  baseUrl?: string
  reqType?: ReqType
  middleware?: Middleware<Ctx>[]
  customFetch?: AnyPromiseFunction
  axiosOptions?: AxiosOptions
  jsonpOptions?: JsonpOptions
  defaultErrorData?: any
}

export interface CommonApiConfig {
  baseUrl?: string
  method?: Method
  prefix?: string
  reqType?: ReqType
  afterFn?: <T = any, U = any>(args: [U?, Ctx?]) => Promise<T>
  beforeFn?: <T = any>(ctx: Ctx) => Promise<T>
  middleware?: Middleware<Ctx>[]
  customFetch?: AnyPromiseFunction
  commonParams?: object | ((args?: object) => object),
  axiosOptions?: AxiosOptions
  jsonpOptions?: JsonpOptions
  useGlobalMiddleware?: boolean
  mock?: Mock
}

export interface SelfApiConfigOnly {
  path: string
  body?: { required: true } | any
  name?: string
  params?: ParamsConfig
}

export interface SelfApiConfig extends CommonApiConfig, SelfApiConfigOnly {}

// for web
export interface WebApiConfig extends CommonApiConfig {
  pathList: SelfApiConfig[]
}

// for wechat miniprogram
export interface WxApiOnly {
  isShowLoading?: boolean
  showLoadingFn?: AnyFunction
  hideLoadingFn?: AnyFunction
}
export interface WxApiConfig extends CommonApiConfig, WxApiOnly {
  pathList: (SelfApiConfig & WxApiOnly)[]
}

export interface RuntimeOptionsOnly extends JsonpOptions {
  body?: any
  params?: Record<string, string>,
  header?: Record<string, string>,
}
export interface WxRuntimeOptions extends Partial<Omit<SelfApiConfig, 'params'>>, WxApiOnly, RuntimeOptionsOnly { }
export interface WebRuntimeOptions extends Partial<Omit<SelfApiConfig, 'params'>>, RuntimeOptionsOnly { }

export interface Api {
  key: string
  mock: Mock
  params: ParamsConfig
  <T = object, U = object | void> (
    params?: U,
    runtimeOptions?: RuntimeOptions
  ): Promise<T>
}
export interface Apis { [k: string]: SyncFnMap }
export interface SyncFnMap { [k: string]: Api }
