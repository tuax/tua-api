import TuaApi from '../../src'

const tuaApi = new TuaApi()

// 使用中间件
tuaApi.use(async (ctx, next) => {
  // 请求发起前
  // console.log('before: ', ctx)

  await next()

  // 响应返回后
  // console.log('after: ', ctx)
})

export const mockApi = tuaApi.getApi(require('./mock').default)
export const fakeWxApi = tuaApi.getApi(require('./fake-wx').default)
