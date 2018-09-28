import TuaApi from '../../src/TuaApiWeb'
import fakeGetConfig from './fake-get'
import fakePostConfig from './fake-post'

const tuaApi = new TuaApi({
    host: 'http://example-base.com/',
    // 默认用 jsonp 的方式，不填默认用 axios
    reqType: 'jsonp',
})

// 使用中间件
// tuaApi.use(async (ctx, next) => {
//     // 请求发起前
//     console.log('before: ', ctx)

//     await next()

//     // 响应返回后
//     console.log('after: ', ctx)
// })

const fakeGet = tuaApi.getApi(fakeGetConfig)
const fakePost = tuaApi.getApi(fakePostConfig)

export {
    fakeGet,
    fakePost,
}
