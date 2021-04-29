export const isWx = () => (
    typeof wx !== 'undefined' &&
    typeof wx.request === 'function'
)

export const isFormData = (val) => (
    (typeof FormData !== 'undefined') &&
    (val instanceof FormData)
)

export const runFn = (fn, ...params) => {
    if (typeof fn === 'function') return fn(...params)

    return fn
}

export const isUndefined = val => typeof val === 'undefined'
