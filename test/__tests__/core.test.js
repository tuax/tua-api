import TuaApiCore from '../../src/TuaApiCore'

const tuaApi = new TuaApiCore

describe('error handling', () => {
    test('non-function middleware', () => {
        expect(() => tuaApi.use('')).toThrow(TypeError('middleware must be a function!'))
    })

    test('unknown reqType', () => {
        expect(() => new TuaApiCore({ reqType: '' })).toThrow(TypeError(`invalid reqType`))
    })
})
