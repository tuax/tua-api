import fakeGet from '../../examples/apis-mp/fake-wx'
import TuaApi from '../../src/TuaApi'

describe('error handling', () => {
    const tuaApi = new TuaApi()

    test('non-function middleware', () => {
        expect(() => tuaApi.use('')).toThrow(TypeError('middleware must be a function!'))
    })

    test('unknown reqType', () => {
        expect(() => new TuaApi({ reqType: '' })).toThrow(TypeError(`invalid reqType`))
    })
})

describe('middleware', () => {
    const tuaApi = new TuaApi({ reqType: 'wx' })
    const globalMiddlewareFn = jest.fn(async (ctx, next) => {
        await next()

        expect(ctx.endTime).toBeDefined()
        expect(ctx.reqTime).toBeDefined()
    })
    tuaApi.use(globalMiddlewareFn)

    const fakeGetApi = tuaApi.getApi(fakeGet)

    beforeEach(() => {
        wx.__TEST_DATA__ = { testData: {} }
    })

    test('useGlobalMiddleware', async () => {
        await fakeGetApi.arrayData()
        expect(globalMiddlewareFn).toBeCalledTimes(0)
        await fakeGetApi.fail()
        expect(globalMiddlewareFn).toBeCalledTimes(1)
    })
})
