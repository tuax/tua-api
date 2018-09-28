import {
    checkArrayParams,
    getParamStrFromObj,
    getDefaultParamObj,
} from './utils'

/**
 * 记录请求开始时间、接受响应时间和请求总时间的中间件
 * @param {Object} ctx 上下文对象
 * @param {Function} next 转移控制权给下一个中间件的函数
 */
const recordReqTimeMiddleware = (ctx, next) => {
    ctx.startTime = Date.now()

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

    if (!jsonData) return Promise.reject(Error('没有数据'))

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
        throw Error(`请检查参数是否为对象！`)
    }

    checkArrayParams(ctx.req)

    // 根据配置生成请求的参数
    const reqParams = Array.isArray(params)
        ? { ...commonParams, ...args }
        : { ...getDefaultParamObj(ctx.req), ...args }

    // 请求地址，用于 post 请求
    const url = host + fullPath

    // 完整请求地址，将参数拼在 url 上，用于 get 请求
    const fullUrl = url + '?' + getParamStrFromObj(reqParams)

    ctx.req.reqFnParams = {
        ...ctx.req.reqFnParams,
        ...rest,
        url,
        fullUrl,
        reqParams,
    }

    return next()
}

/**
 * 更新请求 fullUrl 参数，因为可能请求参数被别的中间件改了
 * @param {Object} ctx 上下文对象
 * @param {Function} next 转移控制权给下一个中间件的函数
 */
const updateFullUrlMiddleware = (ctx, next) => {
    const { url, reqParams } = ctx.req.reqFnParams

    ctx.req.reqFnParams.fullUrl = url + '?' + getParamStrFromObj(reqParams)

    return next()
}

export {
    recordReqTimeMiddleware,
    formatResDataMiddleware,
    updateFullUrlMiddleware,
    formatReqParamsMiddleware,
}
