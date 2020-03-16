import { logger, promisifyWxApi } from '../utils'
import { WxMethod, BaseApiConfig, WxApiConfigOnly } from '../types'
import { ERROR_STRINGS, WX_VALID_METHODS } from '../constants'

type WxRequestOptions = Omit<WechatMiniprogram.RequestOption, 'success' | 'fail' | 'method'>

interface GetWxPromiseOptions extends BaseApiConfig, WxApiConfigOnly, WxRequestOptions {
    method: WxMethod
    fullUrl: string
}

/**
* 获取使用 wx 发起请求后的 promise 对象
* @param {object} options
*/
export const getWxPromise = ({
    url,
    data,
    method,
    header,
    fullUrl,
    isShowLoading = true,
    showLoadingFn = () => wx.showLoading({ title: '加载中' }),
    hideLoadingFn = wx.hideLoading.bind(wx),
    ...rest
}: GetWxPromiseOptions) => {
    method = method.toUpperCase() as WxMethod

    if (method === 'GET') {
        logger.log(`Req Url: ${fullUrl}`)
    } else {
        logger.log(`Req Url: ${url}`)
        if (data && Object.keys(data).length) {
            logger.log('Req Data:', data)
        }
    }

    // 展示 loading
    isShowLoading && showLoadingFn()

    if (WX_VALID_METHODS.indexOf(method) === -1) {
        return Promise.reject(Error(ERROR_STRINGS.unknownMethodFn(method)))
    }

    return promisifyWxApi(wx.request)({
        ...rest,
        url,
        data,
        header,
        method,
        complete: (res) => {
            // 同步隐藏 loading
            isShowLoading && hideLoadingFn()
            /* istanbul ignore next */
            rest.complete && rest.complete(res)
        },
    })
}
