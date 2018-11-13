import { logger, promisifyWxApi } from '../utils'
import { WX_VALID_METHODS } from '../constants'

export const getWxPromise = ({
    url,
    method,
    header,
    fullUrl,
    reqParams: data,
    isShowLoading = true,
    showLoadingFn = () => wx.showLoading({ title: '加载中' }),
    hideLoadingFn = wx.hideLoading.bind(wx),
    ...rest
}) => {
    method = method.toUpperCase()

    method === 'GET'
        ? logger.log(`Req Url: ${fullUrl}`)
        : logger.log(`Req Url: ${url} \nReq Data:`, data)

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
