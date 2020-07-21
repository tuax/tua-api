import TuaApi from '@/index'
import { ERROR_STRINGS } from '@/constants'

const customFetch = jest.fn(() => Promise.resolve({ data: Math.random() }))

describe('customFetch', () => {
    const tuaApi = new TuaApi()
    const fooApi = tuaApi.getApi({
        prefix: 'foo',
        pathList: [
            { path: 'bar', customFetch },
            { path: 'axios', customFetch, reqType: 'axios' },
            { path: 'customAxios', customFetch, reqType: 'custom' },
        ],
    })

    test('both customFetch and reqType', () => {
        expect(() => new TuaApi({ reqType: 'axios', customFetch })).toThrow(TypeError(ERROR_STRINGS.reqTypeAndCustomFetch))
    })

    test('global customFetch should be called', async () => {
        const tuaApi = new TuaApi({ customFetch })
        const fooApi = tuaApi.getApi({
            prefix: 'foo',
            pathList: [
                { path: 'globalCustomFetch' },
            ],
        })
        await fooApi.globalCustomFetch()

        expect(customFetch).toBeCalled()
    })

    test('local customFetch should be called', async () => {
        await fooApi.bar()

        expect(customFetch).toBeCalled()
    })

    test('local customFetch should be called with reqType', async () => {
        await fooApi.axios()

        expect(customFetch).toBeCalled()
    })

    test('local customFetch should be called with `custom` reqType', async () => {
        await fooApi.customAxios()

        expect(customFetch).toBeCalled()
    })
})
