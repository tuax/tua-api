import TuaApiCore from './TuaApiCore'
import { log, promisifyWxApi } from './utils'
import { WX_VALID_METHODS } from './constants'

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
        hideLoadingFn = wx.hideLoading.bind(wx),
        ...rest
    }) {
        method = method.toUpperCase()

        method === 'GET'
            ? log(`Req Url: ${fullUrl}`)
            : log(`Req Url: ${url} \nReq Data:`, data)

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
                // 同步隐藏 loading
                isShowLoading && hideLoadingFn()
            },
        })
    }
}

export default TuaApi
export {
    getSyncFnMapByApis,
    getPreFetchFnKeysBySyncFnMap,
} from './exportUtils'
