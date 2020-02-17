const map = (fn) => (arr) => Array.isArray(arr)
    ? arr.map(fn)
    : pipe(
        Object.keys,
        map(key => ({ [key]: fn(arr[key]) })),
        mergeAll,
    )(arr)

const join = str => arr => arr.join(str)
const concat = val => arr => arr.concat(val)
const filter = fn => arr => arr.filter(fn)
const values = obj => map(k => obj[k])(Object.keys(obj))
const reduce = (fn, val) => (arr) => !arr.length
    ? val
    : val == null
        ? arr.reduce(fn)
        : arr.reduce(fn, val)

const flatten = reduce(
    (acc, cur) => Array.isArray(cur)
        ? compose(concat, flatten)(cur)(acc)
        : concat(cur)(acc),
    [],
)

const merge = (acc, cur) => ({ ...acc, ...cur })
const mergeAll = reduce(merge, {})

/**
 * 从左向右结合函数
 * @param {Function[]} funcs 函数数组
 */
const pipe = (...funcs) => {
    if (funcs.length === 0) return arg => arg
    if (funcs.length === 1) return funcs[0]

    return funcs.reduce((a, b) => (...args) => b(a(...args)))
}

/**
 * 从右向左结合函数
 * @param {Function[]} funcs 函数数组
 */
const compose = (...funcs) => {
    if (funcs.length === 0) return arg => arg
    if (funcs.length === 1) return funcs[0]

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export {
    map,
    join,
    pipe,
    merge,
    concat,
    reduce,
    filter,
    values,
    compose,
    flatten,
    mergeAll,
}
