import {
    map,
    pipe,
    join,
    merge,
    reduce,
} from './fp'
import { logger } from './logger'

/**
 * 将对象序列化为 queryString 的形式
 * @param {Object} data
 * @returns {String}
 */
const getParamStrFromObj = (data = {}) => pipe(
    Object.keys,
    map(key => `${key}=${encodeURIComponent(data[key])}`),
    join('&')
)(data)

/**
 * 检查 params 长度和 args 的长度是否匹配，不匹配则打印告警
 * @param {Object} args 业务侧传递的请求参数
 * @param {Array} params 配置中定义的接口数组
 * @param {String} apiName 接口名称
 * @return {Boolean} 检查结果（测试使用）
 */
const checkArrayParams = ({ args, params, apiName }) => {
    if (!Array.isArray(params)) return true

    if (Object.keys(args).length !== params.length) {
        logger.warn(`${apiName}：传递参数长度与 apiConfig 中配置的不同！请检查！`)
        return false
    }

    return true
}

/**
 * 类似于 vue 的 props，检查传递的参数
 * @param {Object} args 调用时传递参数
 * @param {Array} params 默认参数
 * @param {String} apiName 接口名字
 * @param {Object} commonParams 公用默认参数
 */
const getDefaultParamObj = ({
    args = {},
    params = {},
    apiName,
    commonParams = {},
}) => pipe(
    Object.keys,
    map((key) => {
        const val = params[key]
        const isRequiredValUndefined =
            typeof val === 'object' &&
            // 兼容 vue 的写法
            (val.isRequired || val.required) &&
            args[key] == null

        if (isRequiredValUndefined) {
            throw Error(`${apiName}：必须传递参数 ${key}！请检查！`)
        }

        return { [key]: val }
    }),
    reduce(merge, commonParams)
)(params)

/**
 * 合并 pathList 下的接口配置和上一级的公共配置
 * @param {Array} pathList 接口的最终路径数组
 * @param {Object} rest 其他公共配置
 * @return {Array} 请求所需参数数组
 */
const apiConfigToReqFnParams = ({ pathList, ...rest }) =>
    map((pathObj) => ({ ...rest, ...pathObj }))(pathList)

export {
    checkArrayParams,
    getDefaultParamObj,
    getParamStrFromObj,
    apiConfigToReqFnParams,
}
