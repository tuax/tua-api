/**
 * 原生 Console 上的方法名
 */
export type LogType = keyof Console

/**
 * 统一的日志输出函数，在测试环境时不输出
 * @param logType 输出类型
 */
const logByType = (logType: LogType) => (...out: any[]) => {
    const env = process.env.NODE_ENV
    /* istanbul ignore next */
    if (env === 'test' || env === 'production') return

    /* istanbul ignore next */
    console[logType]('[TUA-API]:', ...out)
}

export const logger = {
    log: logByType('log'),
    warn: logByType('warn'),
    error: logByType('error'),
}
