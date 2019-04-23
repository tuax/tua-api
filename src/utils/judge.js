export const isWx = () => (
    typeof wx !== 'undefined' &&
    typeof wx.request === 'function'
)

export const isFormData = (val) => (
    (typeof FormData !== 'undefined') &&
    (val instanceof FormData)
)
