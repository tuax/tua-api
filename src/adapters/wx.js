import { logger, promisifyWxApi } from '../utils'
import { WX_VALID_METHODS } from '../constants'

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
}) => {
    method = method.toUpperCase()

    if (method === 'GET') {
        logger.log(`Req Url: ${fullUrl}`)
    } else {
        logger.log(`Req Url: ${url}`)
        if (data && Object.keys(data).length) {
            logger.log(`Req Data:`, data)
        }
    }

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
