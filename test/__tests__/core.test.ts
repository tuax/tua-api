import TuaApi from '@/index'
import { ERROR_STRINGS } from '@/constants'

describe('error handling', () => {
  const tuaApi = new TuaApi()

  test('non-function middleware', () => {
    // @ts-ignore
    expect(() => tuaApi.use('')).toThrow(TypeError(ERROR_STRINGS.middleware))
  })
})
