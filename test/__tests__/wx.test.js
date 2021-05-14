import '../__mocks__/wxMock'
import TuaApi from '@/index'
import { ERROR_STRINGS } from '@/constants'

import fakeWx from '@examples/apis-mp/fake-wx'
import { mockApi, fakeWxApi } from '@examples/apis-mp/'

const testObjData = { code: 0, data: 'object data' }
const testArrData = [0, 'array data']

describe('mock data', () => {
  beforeEach(() => {
    wx.__TEST_DATA__ = {}
  })

  test('common mock data', async () => {
    wx.__TEST_DATA__ = { testData: testObjData }
    const resData = await mockApi.bar({ __mockData__: { code: 404, data: {} } })

    expect(resData.code).toBe(404)
  })

  test('self mock data', async () => {
    wx.__TEST_DATA__ = { testData: testObjData }
    const resData = await mockApi.foo({ __mockData__: { code: 404, data: {} } })

    expect(resData.code).toBe(500)
  })

  test('null mock data', async () => {
    wx.__TEST_DATA__ = { testData: testObjData }
    const resData = await mockApi.null({ __mockData__: { code: 404, data: {} } })

    expect(resData).toEqual({ code: 0, data: 'object data' })
  })

  test('dynamic object mock data', async () => {
    wx.__TEST_DATA__ = { testData: testObjData }
    mockApi.null.mock = { code: 123 }
    const resData = await mockApi.null()

    expect(resData.code).toBe(123)
  })

  test('dynamic function mock data', async () => {
    wx.__TEST_DATA__ = { testData: testObjData }
    mockApi.foo.mock = ({ mockCode }) => ({ code: mockCode })
    const resData = await mockApi.foo({ mockCode: 123 })

    expect(resData.code).toBe(123)
  })
})

describe('middleware', () => {
  const tuaApi = new TuaApi()
  const fakeWxApi = tuaApi.getApi(fakeWx)
  const globalMiddlewareFn = jest.fn(async (ctx, next) => {
    expect(ctx.req.host).toBeDefined()
    expect(ctx.req.baseUrl).toBeDefined()
    expect(ctx.req.type).toBeDefined()
    expect(ctx.req.method).toBeDefined()
    expect(ctx.req.path).toBeDefined()
    expect(ctx.req.prefix).toBeDefined()
    expect(ctx.req.reqType).toBeDefined()
    expect(ctx.req.reqParams).toBeDefined()
    expect(ctx.req.axiosOptions).toBeDefined()
    expect(ctx.req.jsonpOptions).toBeDefined()
    expect(ctx.req.reqFnParams).toBeDefined()

    expect(ctx.req.callbackName).toBeUndefined()

    await next()

    expect(ctx.reqTime).toBeDefined()
    expect(ctx.startTime).toBeDefined()
    expect(ctx.endTime).toBeDefined()

    expect(ctx.res.data).toBeDefined()
    expect(ctx.res.rawData).toBeDefined()
  })

  tuaApi.use(globalMiddlewareFn)

  beforeEach(() => {
    wx.__TEST_DATA__ = { testData: {} }
  })

  test('useGlobalMiddleware', async () => {
    await fakeWxApi.arrayData()
    expect(globalMiddlewareFn).toBeCalledTimes(0)
    await fakeWxApi.fail()
    expect(globalMiddlewareFn).toBeCalledTimes(1)
  })
})

describe('fake wx requests', () => {
  beforeEach(() => {
    wx.__TEST_DATA__ = {}
  })

  test('same key', () => {
    expect(fakeWxApi.fail.key).not.toEqual(fakeWxApi.anotherFail.key)
  })

  test('object-data', async () => {
    wx.__TEST_DATA__ = { testData: testObjData }
    const resData = await fakeWxApi.objectData({ param3: '123' })

    expect(resData).toEqual({ code: 0, data: 'object data' })
  })

  test('array-data', async () => {
    wx.__TEST_DATA__ = { testData: testArrData }
    const resData = await fakeWxApi.arrayData(null)

    expect(resData).toEqual({ code: 0, data: 'array data' })
  })

  test('fail', () => {
    wx.__TEST_DATA__ = { isTestFail: true }

    return expect(fakeWxApi.fail({ a: 'b' }))
      .rejects.toEqual(Error('test'))
  })

  test('no-beforeFn', () => {
    return expect(fakeWxApi.noBeforeFn())
      .rejects.toEqual(Error(ERROR_STRINGS.noData))
  })

  test('hide-loading', async () => {
    wx.showLoading.mockClear()
    wx.__TEST_DATA__ = { testData: testObjData }
    const resData = await fakeWxApi.hideLoading()

    expect(resData).toEqual({ code: 0, data: 'object data' })
    expect(wx.showLoading).toHaveBeenCalledTimes(0)
  })

  test('type-get', async () => {
    wx.showLoading.mockClear()
    wx.__TEST_DATA__ = { testData: testObjData }
    await fakeWxApi.typeGet()
    const [[{ method }]] = wx.request.mock.calls

    expect(method).toBe('GET')
    expect(wx.showLoading).toHaveBeenCalledTimes(1)
  })

  test('unknown-type', () => {
    return expect(fakeWxApi.unknownType())
      .rejects.toEqual(Error(ERROR_STRINGS.unknownMethodFn('FOO')))
  })

  test('nav-loading', async () => {
    wx.showNavigationBarLoading.mockClear()
    wx.__TEST_DATA__ = { testData: testObjData }
    const resData = await fakeWxApi.navLoading()

    expect(resData).toEqual({ code: 0, data: 'object data' })
    expect(wx.showNavigationBarLoading).toHaveBeenCalledTimes(1)
  })
})
