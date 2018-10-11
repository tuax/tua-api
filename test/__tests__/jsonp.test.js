import fetchJsonp from 'fetch-jsonp'

import { fakeGet } from '../../examples/apis-web/'

jest.mock('fetch-jsonp')

const reqAP = fakeGet['array-params']
const reqOP = fakeGet['object-params']
const reqACP = fakeGet['async-common-params']
const reqIRT = fakeGet['invalid-req-type']

const returnVal = { code: 0, data: 'array data' }

describe('fake jsonp requests', () => {
    test('async-common-params', () => {
        const data = [ 0, 'array data' ]

        fetchJsonp.mockResolvedValue({ json: () => data })

        return reqACP().then((resData) => {
            expect(resData).toEqual(returnVal)
        })
    })

    test('array-data', () => {
        const data = [ 0, 'array data' ]

        fetchJsonp.mockResolvedValue({ json: () => data })

        return reqAP().then((resData) => {
            expect(resData).toEqual(returnVal)
        })
    })

    test('object-params', () => {
        const data = [ 0, 'array data' ]

        fetchJsonp.mockResolvedValue({ json: () => data })

        return reqOP({ param3: 'steve' }).then((resData) => {
            expect(resData).toEqual(returnVal)
        })
    })

    test('invalid-req-type', () => {
        return expect(reqIRT({ param3: 'steve' })).rejects.toEqual(Error('invalid reqType'))
    })
})
