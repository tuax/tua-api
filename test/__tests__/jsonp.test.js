import fetchJsonp from 'fetch-jsonp'

import { fakeGetApi } from '../../examples/apis-web/'

jest.mock('fetch-jsonp')

const data = [ 0, 'array data' ]
const returnVal = { code: 0, data: 'array data' }

describe('fake jsonp requests', () => {
    test('async-common-params', async () => {
        fetchJsonp.mockResolvedValue({ json: () => data })
        const resData = await fakeGetApi.acp()

        expect(resData).toEqual(returnVal)
    })

    test('array-data', async () => {
        fetchJsonp.mockResolvedValue({ json: () => data })
        const resData = await fakeGetApi.ap()

        expect(resData).toEqual(returnVal)
    })

    test('object-params', async () => {
        fetchJsonp.mockResolvedValue({ json: () => data })
        const resData = await fakeGetApi.op({ param3: 'steve' })

        expect(resData).toEqual(returnVal)
    })

    test('invalid-req-type', () => {
        return expect(fakeGetApi.irt({ param3: 'steve' }))
            .rejects.toEqual(Error('invalid reqType'))
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
