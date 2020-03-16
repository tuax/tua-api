import * as R from 'remeda'

import { logger } from './logger'
import { map, join } from './fp'
import { ERROR_STRINGS } from '../constants'
import { ApiConfig, ParamType, ParamsConfig, PathListItem } from '../types'

/**
 * 将对象序列化为 queryString 的形式
 * @param data
 * @returns
 */
const getParamStrFromObj = (data: { [k: string]: any } = {}) => R.pipe(
    data,
    Object.keys,
    map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`),
    join('&'),
)

/**
 * 检查 params 长度和 args 的长度是否匹配，不匹配则打印告警
 * @param options.args 业务侧传递的请求参数
 * @param options.params 配置中定义的接口数组
 * @param options.apiName 接口名称
 * @returns 检查结果（测试使用）
 */
const checkArrayParams = <T>({ args, params, apiName }: {
    args: T
    params: ParamsConfig
    apiName: string
}): boolean => {
    if (!Array.isArray(params)) return true

    if (Object.keys(args).length !== params.length) {
        logger.warn(`${apiName}：传递参数长度与 apiConfig 中配置的不同！请检查！`)
        return false
    }

    return true
}

/**
 * 类似于 vue 的 props，检查传递的参数
 * @param args 调用时传递参数
 * @param params 默认参数
 * @param apiName 接口名字
 * @param commonParams 公用默认参数
 * @returns 合并了默认和公共参数后的对象
 */
function getDefaultParamObj ({
    args = {},
    params = {},
    apiName,
    commonParams = {},
}: {
    args?: { [k: string]: any }
    params?: ParamsConfig
    apiName: string
    commonParams?: ParamType | null
}) {
    const getOneDefaultParam = (key: string) => {
        if (Array.isArray(params)) return {}

        const val = params[key]
        const isRequiredValUndefined = (
            typeof val === 'object' &&
            // 兼容 vue 的写法
            (val.isRequired || val.required) &&
            args[key] == null
        )

        if (isRequiredValUndefined) {
            logger.error(ERROR_STRINGS.requiredParamFn(apiName, key))

            /* istanbul ignore next */
            if (process.env.NODE_ENV === 'test') {
                throw TypeError(ERROR_STRINGS.requiredParamFn(apiName, key))
            }
        }

        const returnVal = typeof val === 'object' ? '' : val

        return { [key]: returnVal }
    }

    if (Array.isArray(params)) {
        return params.map(getOneDefaultParam)
    }

    return R.pipe(
        params,
        Object.keys,
        keys => R.map(keys, getOneDefaultParam),
        items => R.reduce(items, R.merge, commonParams),
    ) as ParamType
}

/**
 * 合并 pathList 下的接口配置和上一级的公共配置
 * @param apiConfig
 * @returns 请求所需参数数组
 */
function apiConfigToReqFnParams (apiConfig: ApiConfig): PathListItem[] {
    const { pathList, ...rest } = apiConfig

    return R.map(
        pathList,
        pathObj => ({ ...rest, ...pathObj }),
    )
}

export {
    checkArrayParams,
    getDefaultParamObj,
    getParamStrFromObj,
    apiConfigToReqFnParams,
}
