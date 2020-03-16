export const isWx = () => (
    typeof wx !== 'undefined' &&
    typeof wx.request === 'function'
)

export const isFormData = (val: any) => (
    (typeof FormData !== 'undefined') &&
    (val instanceof FormData)
)

export const isUndefined = (val: any) => typeof val === 'undefined'
