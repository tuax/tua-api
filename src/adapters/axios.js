import axios from 'axios'

import { DEFAULT_HEADER } from '../constants'
import { logger, getParamStrFromObj } from '../utils'

// 获取使用 axios 发起请求后的 promise 对象
export const getAxiosPromise = ({
    url,
    data,
    method = 'post',
    headers = DEFAULT_HEADER,
    crossDomain = true,
    withCredentials = true,
    transformRequest = [getParamStrFromObj],
    ...rest
}) => {
    logger.log(`Req Url: ${url}`)
    if (data && Object.keys(data).length) {
        logger.log(`Req Data:`, data)
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
