import axios from 'axios'

import { DEFAULT_HEADER } from '../constants'
import { logger, isFormData, getParamStrFromObj } from '../utils'

/**
 * 获取使用 axios 发起请求后的 promise 对象
 * @param {object} options
 */
export const getAxiosPromise = ({
    url,
    data,
    method,
    headers,
    crossDomain = true,
    withCredentials = true,
    transformRequest,
    ...rest
}) => {
    const isFD = isFormData(data)

    logger.log(`Req Url: ${url}`)
    if (data && (Object.keys(data).length || isFD)) {
        logger.log('Req Data:', data)
    }

    // 优先使用用户的配置
    if (!transformRequest) {
        transformRequest = isFD
            ? null
            : method !== 'post'
                ? getParamStrFromObj
                // 如果使用 post 的请求方式，自动对其 stringify
                : x => JSON.stringify(x)
    }
    if (!headers) {
        headers = method === 'post'
            ? { 'Content-Type': 'application/json' }
            : DEFAULT_HEADER
    }

    return axios({
        url,
        data,
        method,
        headers,
        crossDomain,
        withCredentials,
        transformRequest,
        ...rest,
    })
}
