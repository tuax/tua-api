import { ERROR_STRINGS } from './constants'
import {
    checkArrayParams,
    getParamStrFromObj,
    getDefaultParamObj,
} from './utils'

/**
 * 记录请求开始时间
 * @param {Object} ctx 上下文对象
 * @param {Function} next 转移控制权给下一个中间件的函数
 */
const recordStartTimeMiddleware = (ctx, next) => {
    ctx.startTime = Date.now()

    return next()
}

/**
 * 记录接受响应时间和请求总时间的中间件
 * @param {Object} ctx 上下文对象
 * @param {Function} next 转移控制权给下一个中间件的函数
 */
const recordReqTimeMiddleware = (ctx, next) => {
    return next().then(() => {
        ctx.endTime = Date.now()
        ctx.reqTime = Date.now() - ctx.startTime
    })
}

/**
 * 由于后台返回数据结构不统一，增加对于返回数组情况的兼容处理
 * 且对于 code 进行强制类型转换
 * @param {Object} ctx 上下文对象
 * @param {Array|Object} ctx.res.data 接口返回数据
 * @param {Function} next 转移控制权给下一个中间件的函数
 */
const formatResDataMiddleware = (ctx, next) => next().then(() => {
    const jsonData = ctx.res.data

    if (!jsonData) return Promise.reject(Error(ERROR_STRINGS.noData))

    if (Array.isArray(jsonData)) {
        const [ code, data, msg ] = jsonData
        ctx.res.data = { code: +code, data, msg }
    } else {
        ctx.res.data = { ...jsonData, code: +jsonData.code }
    }
})

/**
 * 生成请求函数所需参数
 * @param {Object} ctx 上下文对象
 * @param {Function} next 转移控制权给下一个中间件的函数
 */
const formatReqParamsMiddleware = (ctx, next) => {
    const {
        args,
        host,
        params,
        fullPath,
        commonParams,
        ...rest
    } = ctx.req

    if (typeof args !== 'object') {
        throw TypeError(ERROR_STRINGS.argsType)
    }

    checkArrayParams(ctx.req)

    // 根据配置生成请求的参数
    const reqParams = Array.isArray(params)
        ? { ...commonParams, ...args }
        : { ...getDefaultParamObj(ctx.req), ...args }

    // 请求地址
    const url = host + fullPath

    ctx.req.reqFnParams = {
        ...ctx.req.reqFnParams,
        ...rest,
        url,
        reqParams,
    }

    return next()
}

/**
 * 设置请求 fullUrl 参数
 * @param {Object} ctx 上下文对象
 * @param {Function} next 转移控制权给下一个中间件的函数
 */
const setFullUrlMiddleware = (ctx, next) => {
    const { url, reqParams } = ctx.req.reqFnParams

    const paramsStr = getParamStrFromObj(reqParams)

    // 完整请求地址，将参数拼在 url 上，用于 get 请求
    ctx.req.reqFnParams.fullUrl = paramsStr
        ? url + '?' + paramsStr
        : url

    return next()
}

export {
    setFullUrlMiddleware,
    recordReqTimeMiddleware,
    formatResDataMiddleware,
    recordStartTimeMiddleware,
    formatReqParamsMiddleware,
}
