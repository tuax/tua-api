import axios, { AxiosRequestConfig } from 'axios'

import { logger } from '../utils'

/**
 * 获取使用 axios 发起请求后的 promise 对象
 * @param {object} options
 */
export const getAxiosPromise = ({
    url,
    data,
    withCredentials = true,
    ...rest
}: AxiosRequestConfig) => {
    logger.log(`Req Url: ${url}`)
    if (data && (Object.keys(data).length)) {
        logger.log('Req Data:', data)
    }

    return axios({ url, data, withCredentials, ...rest })
}
