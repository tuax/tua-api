import TuaApiCore from './TuaApiCore'
import { logger, promisifyWxApi } from './utils'
import {
    MIN_LOADING_TIME,
    WX_VALID_METHODS,
} from './constants'

class TuaApi extends TuaApiCore {
    constructor (options) {
        super(options)

        this.reqFn = this.getWxRequestPromise
    }

    // 获取发起 wx.request 请求后的 promise 对象
    getWxRequestPromise ({
        url,
        type: method,
        header,
        fullUrl,
        reqParams: data,
        isShowLoading = true,
        showLoadingFn = () => wx.showLoading({ title: '加载中' }),
        hideLoadingFn = wx.hideLoading,
        minLoadingTime = MIN_LOADING_TIME,
        ...rest
    }) {
        method = method.toUpperCase()

        method === 'GET'
            ? logger.log(`Req Url: ${fullUrl}`)
            : logger.log(`Req Url: ${url} \nReq Data:`, data)

        const lastLoadingTime = Date.now()

        // 展示 loading
        isShowLoading && showLoadingFn()

        if (WX_VALID_METHODS.indexOf(method) === -1) {
            return Promise.reject(Error(`Unknown Method: ${method}!!!`))
        }

        return promisifyWxApi(wx.request)({
            ...rest,
            url,
            data,
            header,
            method,
            complete: () => {
                if (!isShowLoading) return

                // 设置最小 loading 时间优化体验
                const loadingTime = minLoadingTime - (Date.now() - lastLoadingTime)
                setTimeout(hideLoadingFn, loadingTime)
            },
        })
    }
}

export default TuaApi
export * from './exportUtils'
