// 支持的请求类型
const VALID_REQ_TYPES = ['axios', 'jsonp']

// 小程序中合法的请求方法
const WX_VALID_METHODS = ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT']

const DEFAULT_HEADER = { 'Content-Type': 'application/x-www-form-urlencoded' }

export {
    DEFAULT_HEADER,
    VALID_REQ_TYPES,
    WX_VALID_METHODS,
}
