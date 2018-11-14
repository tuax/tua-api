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
