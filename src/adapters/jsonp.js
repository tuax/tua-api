import { logger } from '../utils'

// 获取发起 jsonp 请求后的 promise 对象
export const getFetchJsonpPromise = ({ url, jsonpOptions }) => {
    logger.log(`Jsonp Url: ${url}`)

    return require('fetch-jsonp')(url, jsonpOptions)
        .then(res => res.json())
        .then(data => ({ data }))
}
