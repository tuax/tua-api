import { fakeGetApi } from '@examples/apis-web/'
import fakeGetConfig from '@examples/apis-web/fake-get'
import { ERROR_STRINGS } from '@/constants'

jest.mock('fetch-jsonp')

/**
 * @type {*}
 */
const fetchJsonp = require('fetch-jsonp')

const data = [0, 'array data']
const returnVal = { code: 0, data: 'array data' }

describe('mock data', () => {
  test('mock object data', async () => {
    fetchJsonp.mockResolvedValue({ json: () => data })
    const resData = await fakeGetApi.mockObjectData()

    expect(resData.code).toBe(404)
  })
})

describe('fake jsonp requests', () => {
  test.only('jsonp options', async () => {
    fetchJsonp.mockResolvedValue({ json: () => data })

    const url = 'http://example-base.com/fake-get/jsonp-options'
    const jsonpOptions = {
      ...fakeGetConfig.jsonpOptions,
      charset: 'UTF-8',
    }

    await fakeGetApi.jsonpOptions()
    expect(fetchJsonp).toBeCalledWith(url, jsonpOptions)

    const jsonpCallback = 'test_cb'
    const jsonpCallbackFunction = 'test_cbName'
    await fakeGetApi.jsonpOptions(null, { jsonpCallback, jsonpCallbackFunction })
    expect(fetchJsonp).toBeCalledWith(url, {
      ...jsonpOptions,
      jsonpCallback,
      jsonpCallbackFunction,
    })
  })

  test('async-common-params', async () => {
    fetchJsonp.mockResolvedValue({ json: () => data })
    const resData = await fakeGetApi.acp()

    expect(resData).toEqual(returnVal)
  })

  test('array-data', async () => {
    fetchJsonp.mockResolvedValue({ json: () => data })
    const resData = await fakeGetApi.ap({})

    expect(resData).toEqual(returnVal)
  })

  test('object-params', async () => {
    fetchJsonp.mockResolvedValue({ json: () => data })
    const resData = await fakeGetApi.op({ param3: 'steve' })

    expect(resData).toEqual(returnVal)
  })

  test('invalid-req-type', () => {
    return expect(fakeGetApi.irt({ param3: 'steve' }))
      .rejects.toEqual(TypeError(ERROR_STRINGS.reqTypeFn('foobar')))
  })

  test('data should be passed through afterFn', async () => {
    fetchJsonp.mockResolvedValue({ json: () => data })
    const { afterData } = await fakeGetApi.afterData()

    expect(afterData).toBe('afterData')
  })

  test('there must be some data after afterFn', async () => {
    fetchJsonp.mockResolvedValue({ json: () => data })
    const resData = await fakeGetApi.noAfterData()

    expect(resData).toEqual(returnVal)
  })
})
