import { ERROR_STRINGS } from './constants'
import {
    isFormData,
    checkArrayParams,
    getParamStrFromObj,
    getDefaultParamObj,
} from './utils'

/**
 * 记录请求开始时间
 * @param {object} ctx 上下文对象
 * @param {Function} next 转移控制权给下一个中间件的函数
 */
const recordStartTimeMiddleware = (ctx, next) => {
    ctx.startTime = Date.now()

    return next()
}

/**
 * 记录接受响应时间和请求总时间的中间件
 * @param {object} ctx 上下文对象
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
 * @param {object} ctx 上下文对象（ctx.res.data 接口返回数据）
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
 * @param {object} ctx 上下文对象
 * @param {Function} next 转移控制权给下一个中间件的函数
 */
const formatReqParamsMiddleware = (ctx, next) => {
    const {
        args,
        params,
        commonParams,
    } = ctx.req

    if (typeof args !== 'object') {
        throw TypeError(ERROR_STRINGS.argsType)
    }

    if (isFormData(args)) {
        ctx.req.reqParams = args

        return next()
    }

    checkArrayParams(ctx.req)

    // 根据配置生成请求的参数
    ctx.req.reqParams = Array.isArray(params)
        ? { ...commonParams, ...args }
        : { ...getDefaultParamObj(ctx.req), ...args }

    return next()
}

/**
 * 设置请求的 reqFnParams 参数，将被用于 _reqFn 函数
 * @param {object} ctx 上下文对象
 * @param {Function} next 转移控制权给下一个中间件的函数
 */
const setReqFnParamsMiddleware = (ctx, next) => {
    const { path, host, prefix, reqParams, ...rest } = ctx.req

    // 请求地址
    const url = host + prefix + '/' + path
    const paramsStr = getParamStrFromObj(reqParams)
    // 完整请求地址，将参数拼在 url 上，用于 get 请求
    const fullUrl = paramsStr ? `${url}?${paramsStr}` : url

    ctx.req.reqFnParams = {
        url,
        fullUrl,
        reqParams,
        ...rest,
        // 若是用户自己传递 reqFnParams 则优先级最高
        ...ctx.req.reqFnParams,
    }

    return next()
}

export {
    recordReqTimeMiddleware,
    formatResDataMiddleware,
    setReqFnParamsMiddleware,
    recordStartTimeMiddleware,
    formatReqParamsMiddleware,
}
