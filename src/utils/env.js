export const isWx = () => (
    typeof wx !== 'undefined' &&
    typeof wx.request === 'function'
)
