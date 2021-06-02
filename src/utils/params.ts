import { logger } from './logger'
import { ERROR_STRINGS } from '../constants'
import {
  map,
  pipe,
  join,
  merge,
  reduce,
} from './fp'

/**
 * 将对象序列化为 queryString 的形式
 * @param {object} data
 * @returns {string}
 */
const getParamStrFromObj = (data = {}) => pipe(
  Object.keys,
  map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`),
  join('&'),
)(data)

/**
 * 检查 params 长度和 args 的长度是否匹配，不匹配则打印告警
 * @param {object} options
 * @param {object} [options.args] 业务侧传递的请求参数
 * @param {array|object} options.params 配置中定义的接口数组
 * @param {string} [options.name] 接口名称
 * @return {Boolean} 检查结果（测试使用）
 */
const checkArrayParams = ({ args = {}, params, name = '' }) => {
  if (!Array.isArray(params)) return true

  if (Object.keys(args).length !== params.length) {
    logger.warn(`${name}：传递参数长度与 apiConfig 中配置的不同！请检查！`)
    return false
  }

  return true
}

/**
 * 类似于 vue 的 props，检查传递的参数
 * @param {object} options
 * @param {object} [options.args] 调用时传递参数
 * @param {object} [options.params] 默认参数
 * @param {string} [options.name] 接口名字
 * @param {object} [options.commonParams] 公用默认参数
 */
const getDefaultParamObj = ({
  args = {},
  params = {},
  name = '',
  commonParams = {},
}) => pipe(
  Object.keys,
  map((key) => {
    const val = params[key]
    const isRequiredValUndefined = (
      typeof val === 'object' &&
      // 兼容 vue 的写法
      (val.isRequired || val.required) &&
      args[key] == null
    )

    if (isRequiredValUndefined) {
      logger.error(ERROR_STRINGS.requiredParamFn(name, key))

      /* istanbul ignore next */
      if (process.env.NODE_ENV === 'test') {
        throw TypeError(ERROR_STRINGS.requiredParamFn(name, key))
      }
    }

    const returnVal = typeof val === 'object' ? '' : val

    return { [key]: returnVal }
  }),
  reduce(merge, commonParams),
)(params)

/**
 * 合并 pathList 下的接口配置和上一级的公共配置
 * @param {{ pathList: object[], [k: string]: any }} options
 * @return {array} 请求所需参数数组
 */
const apiConfigToReqFnParams = ({ pathList, ...rest }) =>
  map((pathObj) => ({ ...rest, ...pathObj }))(pathList)

export {
  checkArrayParams,
  getDefaultParamObj,
  getParamStrFromObj,
  apiConfigToReqFnParams,
}
