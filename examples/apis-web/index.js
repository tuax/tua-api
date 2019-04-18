import TuaApi from '../../src'

const tuaApi = new TuaApi({
    host: 'http://example-base.com/',
    // 默认用 jsonp 的方式，不填默认用 axios
    reqType: 'jsonp',
})

// 使用中间件
tuaApi.use(async (ctx, next) => {
    // 请求发起前
    // console.log('before: ', ctx)

    await next()

    // 响应返回后
    // console.log('after: ', ctx)
})

export const fakeGetApi = tuaApi.getApi(require('./fake-get').default)
export const fakePostApi = tuaApi.getApi(require('./fake-post').default)
