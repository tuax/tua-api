import { logger } from '../utils'

import fetchJsonp, { Options, Response } from 'fetch-jsonp'

// 获取发起 jsonp 请求后的 promise 对象
export function getFetchJsonpPromise ({ url, jsonpOptions }: {
    url: string
    jsonpOptions: Options
}) {
    logger.log(`Jsonp Url: ${url}`)

    return fetchJsonp(url, jsonpOptions)
        .then((res: Response) => res.json())
        .then(data => ({ data }))
}
