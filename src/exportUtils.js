import {
    map,
    pipe,
    filter,
    values,
    flatten,
    mergeAll,
} from './utils/'

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
 * @param {object} apis
 * @return {object}
 */
const getSyncFnMapByApis = pipe(
    values,
    map(values),
    flatten,
    map(val => ({ [val.key]: val })),
    mergeAll
)

/**
 * 过滤出有默认参数的接口（接口参数非数组，且不含有 isRequired/required）
 * @param {object} syncFnMap
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
    getSyncFnMapByApis,
    getPreFetchFnKeysBySyncFnMap,
}
