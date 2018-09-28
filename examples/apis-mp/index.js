import TuaApi from '../../src/TuaApiMp'
import fakeWxConfig from './fake-wx'

const tuaApi = new TuaApi()

// 使用中间件
tuaApi.use(async (ctx, next) => {
    // 请求发起前
    // console.log('before: ', ctx)

    await next()

    // 响应返回后
    // console.log('after: ', ctx)
})

const fakeWx = tuaApi.getApi(fakeWxConfig)

export {
    fakeWx,
}
