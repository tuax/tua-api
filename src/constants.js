// 支持的请求类型
const VALID_REQ_TYPES = ['wx', 'axios', 'jsonp']

// 小程序中合法的请求方法
const WX_VALID_METHODS = ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT']

// 默认请求头
const DEFAULT_HEADER = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }

// 错误信息
const ERROR_STRINGS = {
    noData: 'no data!',
    argsType: 'the first parameter must be an object!',
    middleware: 'middleware must be a function!',

    reqTypeFn: (reqType) => `invalid reqType: "${reqType}", ` +
        `support these reqTypes: ["${VALID_REQ_TYPES.join('", "')}"].`,
    unknownMethodFn: method => `unknown method: "${method}"!`,
    requiredParamFn: (apiName, param) => `${apiName} must pass required param: "${param}"!`,
}

export {
    ERROR_STRINGS,
    DEFAULT_HEADER,
    VALID_REQ_TYPES,
    WX_VALID_METHODS,
}
