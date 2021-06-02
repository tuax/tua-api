import axios, { AxiosRequestConfig } from 'axios'

import { DEFAULT_HEADER } from '../constants'
import { logger, isFormData, isUndefined, getParamStrFromObj } from '../utils'

/**
 * 获取使用 axios 发起请求后的 promise 对象
 * @param {object} options
 */
export const getAxiosPromise = ({
  url,
  data,
  params,
  method,
  headers,
  withCredentials = true,
  transformRequest,
  ...rest
}: AxiosRequestConfig) => {
  logger.log(`Req Url: ${url}`)
  if (params && (Object.keys(params).length)) {
    logger.log('Req Params:', params)
  }
  if (data && (Object.keys(data).length)) {
    logger.log('Req Data:', data)
  }

  return axios({
    url,
    data,
    method,
    headers,
    withCredentials,
    transformRequest,
    ...rest,
  })
}
