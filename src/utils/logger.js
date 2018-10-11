/**
 * 统一的日志输出函数，在测试环境时不输出
 * @param {String} type 输出类型 log|warn|error
 * @param {any} out 具体的输出内容
 */
const logByType = (type) => (...out) => {
    /* istanbul ignore else */
    if (process.env.NODE_ENV === 'test') return

    /* istanbul ignore next */
    console[type](`[TUA-API]:`, ...out)
}

const log = logByType('log')
const warn = logByType('warn')
const error = logByType('error')

export {
    log,
    warn,
    error,
}
