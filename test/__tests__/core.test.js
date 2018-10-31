import fakeGet from '../../examples/apis-mp/fake-wx'
import TuaApiMp from '../../src/TuaApiMp'
import TuaApiCore from '../../src/TuaApiCore'

describe('error handling', () => {
    const tuaApiCore = new TuaApiCore()

    test('non-function middleware', () => {
        expect(() => tuaApiCore.use('')).toThrow(TypeError('middleware must be a function!'))
    })

    test('unknown reqType', () => {
        expect(() => new TuaApiCore({ reqType: '' })).toThrow(TypeError(`invalid reqType`))
    })
})

describe('middleware', () => {
    const tuaApi = new TuaApiMp()
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
