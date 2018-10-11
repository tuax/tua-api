import TuaApiCore from './TuaApiCore'

import { log, error, getParamStrFromObj } from './utils'
import {
    DEFAULT_HEADER,
    VALID_REQ_TYPES,
} from './constants'

class TuaApi extends TuaApiCore {
    constructor (options) {
        super(options)

        this.reqFn = this.getJsonpOrAxiosPromise
    }

    // 根据 reqType 和 type 决定调用 jsonp 还是 axios
    getJsonpOrAxiosPromise ({
        url,
        type,
        fullUrl,
        reqType,
        reqParams: data,
        callbackName,
        jsonpOptions,
        axiosOptions,
    }) {
        if (VALID_REQ_TYPES.indexOf(reqType) === -1) {
            error(`reqType 的有效值为: ${VALID_REQ_TYPES.join(', ')}!`)
            throw Error('invalid reqType')
        }

        // 优先使用 reqType
        if (reqType === 'axios') {
            return this.getAxiosPromise({
                url: fullUrl,
                data,
                method: type.toLowerCase(),
                ...axiosOptions,
            })
        }

        // 默认对于 post 请求使用 axios
        return type.toLowerCase() === 'post'
            ? this.getAxiosPromise({ url, data, ...axiosOptions })
            : this.getFetchJsonpPromise({
                url: fullUrl,
                jsonpOptions: { ...jsonpOptions, callbackName },
            })
    }

    // 获取使用 axios 发起请求后的 promise 对象
    getAxiosPromise ({
        url,
        data,
        method = 'post',
        headers = DEFAULT_HEADER,
        crossDomain = true,
        withCredentials = true,
        transformRequest = [getParamStrFromObj],
        ...rest
    }) {
        log(`Req Url: ${url}`)
        log(`Req Data:`, data)

        return require('axios')({
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

    // 获取发起 jsonp 请求后的 promise 对象
    getFetchJsonpPromise ({ url, jsonpOptions }) {
        log(`Jsonp Url: ${url}`)

        return require('fetch-jsonp')(url, jsonpOptions)
            .then(res => res.json())
            .then(data => ({ data }))
    }
}

export default TuaApi
export {
    getSyncFnMapByApis,
    getPreFetchFnKeysBySyncFnMap,
} from './exportUtils'
