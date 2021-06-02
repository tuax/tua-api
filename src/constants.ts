// 小程序中合法的请求方法
const WX_VALID_METHODS = ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT']

// 默认请求头
const DEFAULT_HEADER = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }

// 错误信息
const ERROR_STRINGS = {
  noData: 'no data!',
  argsType: 'the parameters must be an object!',
  middleware: 'middleware must be a function!',
  reqTypeAndCustomFetch: 'reqType or customFetch only!',
  unknownMethodFn: method => `unknown method: "${method}"!`,
  requiredParamFn: (name, param) => `${name} must pass required param: "${param}"!`,
}

export {
  ERROR_STRINGS,
  DEFAULT_HEADER,
  WX_VALID_METHODS,
}
