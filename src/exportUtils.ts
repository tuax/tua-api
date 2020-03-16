import * as R from 'remeda'

import {
    map,
    values,
} from './utils'
import { Apis, ApiFn, SyncFnMap } from './types'

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
 * @param apis
 * @return 各个发起 api 的函数和 key 的 map
 */
const getSyncFnMapByApis = (apis: Apis) => R.pipe(
    apis,
    values,
    map(values),
    (x: ApiFn[][]) => R.flatten(x),
    map((val: ApiFn) => ({ [val.key]: val })),
    R.mergeAll,
) as { [k: string]: ApiFn }

/**
 * 过滤出有默认参数的接口（接口参数非数组，且不含有 isRequired/required）
 * @param syncFnMap
 * @return keys 所有有默认参数的接口名称
 */
const getPreFetchFnKeysBySyncFnMap = (syncFnMap: SyncFnMap) => R.pipe(
    syncFnMap,
    Object.keys,
    R.filter((key) => {
        const { params } = syncFnMap[key]

        if (Array.isArray(params)) return false

        // 当前参数不是必须的
        const isParamNotRequired = (key: string) => {
            const value = params[key]

            return (
                typeof value !== 'object' ||
                // 兼容 vue 的写法
                (!value.required && !value.isRequired)
            )
        }

        return Object.keys(params).every(isParamNotRequired)
    }),
    map(key => ({ key })),
)

export {
    getSyncFnMapByApis,
    getPreFetchFnKeysBySyncFnMap,
}
