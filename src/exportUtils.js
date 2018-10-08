import fs from 'fs'
import path from 'path'
import {
    map,
    pipe,
    filter,
    flatten,
    mergeAll,
    hyphenCaseToCamelCase,
} from './utils/'

/**
 * 获取小驼峰形式的 api 名称
 * 例如 name 是 foo-bar -> fooBarApi
 * @param {String} name api 的名称
 * @param {String} suffix 生成的 api 的后缀
 * @return {String} 小驼峰形式的 api 名称
 */
const getApiName = (name, suffix = 'Api') => hyphenCaseToCamelCase(name) + suffix

/**
 * 导出当前文件夹下所有接口，接收 TuaApi 实例，调用 fs 读取当前文件夹下的所有接口文件，生成 api 函数对象并导出。
 * @param {TuaApi} tuaApi TuaApi实例
 * @param {String} suffix 生成的 api 的后缀
 */
const exportAllApis = (tuaApi, suffix) => fs
    .readdirSync(path.join(__dirname))
    .filter(f => f !== 'index.js')
    .map(file => require(path.join(__dirname, file)).default)
    .forEach((cfg) => {
        const apiName = getApiName(cfg.name || cfg.prefix, suffix)

        module.exports[apiName] = tuaApi.getApi(cfg)
    })

/**
 * 将各个发起 api 的函数的 key 与其绑定，与 TuaStorage 配合使用效果更佳
 * apis: { api1: apiMap1, api2: apiMap2 }
 * apiMap: {
 *  path1: { [Function: path1] key: key1 },
 *  path2: { [Function: path2] key: key2 },
 *  ...
 * }
 *
 * 转换成 {
 *  key1: [Function: path1] key: key1,
 *  key2: [Function: path2] key: key2,
 *  ...
 * }
 * @param {Object} apis
 * @return {Object}
 */
const getSyncFnMapByApis = pipe(
    Object.values,
    map(Object.values),
    flatten,
    map(val => ({ [val.key]: val })),
    mergeAll
)

/**
 * 过滤出有默认参数的接口（接口参数非数组，且不含有 isRequired/required）
 * @param {Object} syncFnMap
 * @return {Array} keys 所有有默认参数的接口名称
 */
const getPreFetchFnKeysBySyncFnMap = (syncFnMap) => pipe(
    Object.keys,
    filter((key) => {
        const { params } = syncFnMap[key]

        if (Array.isArray(params)) return false

        // 当前参数不是必须的
        const isParamNotRequired = (key) => (
            typeof params[key] !== 'object' ||
            // 兼容 vue 的写法
            (!params[key].isRequired && !params[key].required)
        )

        return Object.keys(params).every(isParamNotRequired)
    }),
    map(key => ({ key }))
)(syncFnMap)

export {
    exportAllApis,
    getSyncFnMapByApis,
    getPreFetchFnKeysBySyncFnMap,
}
