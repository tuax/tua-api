import { fakeGetApi } from '@examples/apis-web/'
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
        /**
         * @type {*}
         */
        const resData = await fakeGetApi.mockObjectData()

        expect(resData.code).toBe(404)
    })
})

describe('fake jsonp requests', () => {
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
