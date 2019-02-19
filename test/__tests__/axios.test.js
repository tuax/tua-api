import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { ERROR_STRINGS } from '@/constants'
import { fakeGetApi, fakePostApi } from '@examples/apis-web/'

const mock = new MockAdapter(axios)

const params = {
    param1: 'steve',
    param2: 'young',
}

const reqAPUrl = `http://example-base.com/fake-post/array-params`
const reqOPUrl = `http://example-base.com/fake-post/object-params`
const reqOHUrl = `http://example-test.com/fake-post/own-host`
const reqTAUrl = `http://example-base.com/fake-get/req-type-axios?asyncCp=asyncCp`
const reqEAPUrl = `http://example-base.com/fake-post/empty-array-params`
const reqMFDUrl = `http://example-base.com/fake-get/mock-function-data`

describe('mock data', () => {
    test('mock function data', async () => {
        mock.onGet(reqMFDUrl).reply(200, {})
        const resData = await fakeGetApi.mockFnData({ mockCode: 404 })

        expect(resData.code).toBe(404)
    })
})

describe('error handling', () => {
    test('non-object params', () => {
        return expect(fakePostApi.ap('a')).rejects.toEqual(TypeError(ERROR_STRINGS.argsType))
    })

    test('error', () => {
        mock.onPost(reqEAPUrl).networkError()

        return expect(fakePostApi.eap()).rejects.toEqual(Error('Network Error'))
    })

    test('must pass required params', () => {
        return expect(fakePostApi.op())
            .rejects.toEqual(Error(ERROR_STRINGS.requiredParamFn('op', 'param3')))
    })
})

describe('fake get requests', () => {
    test('req-type-axios', async () => {
        const data = { code: 0, data: 'req-type-axios' }
        mock.onGet(reqTAUrl).reply(200, data)
        const resData = await fakeGetApi.rta()

        expect(resData).toEqual(data)
    })

    test('runtime get', async () => {
        const data = { code: 0, data: 'runtime get' }
        mock.onGet(reqAPUrl).reply(200, data)
        const resData = await fakePostApi.ap(null, {
            type: 'get',
            reqType: 'axios',
            commonParams: null,
        })

        expect(resData).toEqual(data)
    })
})

describe('fake post requests', () => {
    test('own-host', async () => {
        const data = { code: 0, data: 'own-host' }
        mock.onPost(reqOHUrl).reply(200, data)
        const resData = await fakePostApi.oh()

        expect(resData).toEqual(data)
    })

    test('empty-array-params', async () => {
        const data = { code: 0, data: 'object data' }
        mock.onPost(reqEAPUrl).reply(200, data)
        const resData = await fakePostApi.eap()

        expect(resData).toEqual(data)
    })

    test('array-params', async () => {
        const data = { code: 0, data: 'object data' }
        mock.onPost(reqAPUrl).reply(200, data)
        const resData = await fakePostApi.ap(params)

        expect(resData).toEqual(data)
    })

    test('array-data', async () => {
        const data = [ 0, 'array data' ]
        mock.onPost(reqOPUrl).reply(200, data)
        const resData = await fakePostApi.op({ param3: 'steve' })

        expect(resData).toEqual({ code: 0, data: 'array data' })
    })
})
