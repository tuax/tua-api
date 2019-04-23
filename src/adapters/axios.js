import axios from 'axios'

import { DEFAULT_HEADER } from '../constants'
import { logger, isFormData, getParamStrFromObj } from '../utils'

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
    const isFD = isFormData(data)

    logger.log(`Req Url: ${url}`)
    if (data && (Object.keys(data).length || isFD)) {
        logger.log(`Req Data:`, data)
    }

    transformRequest = isFD ? null : transformRequest

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
