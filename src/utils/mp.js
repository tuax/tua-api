/**
 * 将小程序 api promise 化
 * @param {Function} fn
 * @param {Object} args
 * @returns {Promise}
 */
const promisifyWxApi = (fn) => (args = {}) => (
    new Promise((success, fail) => {
        fn({ fail, success, ...args })
    })
)

export {
    promisifyWxApi,
}
