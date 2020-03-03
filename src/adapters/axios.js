import axios from 'axios'

import { DEFAULT_HEADER } from '../constants'
import { logger, isFormData, isUndefined, getParamStrFromObj } from '../utils'

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
    const isPost = method.toLowerCase() === 'post'

    logger.log(`Req Url: ${url}`)
    if (data && (Object.keys(data).length || isFD)) {
        logger.log('Req Data:', data)
    }

    // 优先使用用户的配置
    if (isUndefined(transformRequest)) {
        transformRequest = isFD
            ? null
            : isPost
                // 如果使用 post 的请求方式，自动对其 stringify
                ? x => JSON.stringify(x)
                : getParamStrFromObj
    }
    if (isUndefined(headers)) {
        headers = isPost
            ? { 'Content-Type': 'application/json;charset=utf-8' }
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
