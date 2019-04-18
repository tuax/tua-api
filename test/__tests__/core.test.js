import TuaApi from '@/'
import { ERROR_STRINGS } from '@/constants'

describe('error handling', () => {
    const tuaApi = new TuaApi()

    test('non-function middleware', () => {
        expect(() => tuaApi.use('')).toThrow(TypeError(ERROR_STRINGS.middleware))
    })

    test('unknown reqType', () => {
        expect(() => new TuaApi({ reqType: '' })).toThrow(TypeError(ERROR_STRINGS.reqTypeFn('')))
    })
})
