/**
 * 将小程序 api promise 化
 * @param {Function} fn
 */
const promisifyWxApi = (fn) => (args = {}) => (
    new Promise((success, fail) => {
        fn({ fail, success, ...args })
    })
)

export {
    promisifyWxApi,
}
