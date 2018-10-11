import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { fakeGet, fakePost } from '../../examples/apis-web/'

const mock = new MockAdapter(axios)

const params = {
    param1: 'steve',
    param2: 'young',
}
const reqOH = fakePost['own-host']
const reqAP = fakePost['array-params']
const reqOP = fakePost['object-params']
const reqTA = fakeGet['req-type-axios']
const reqEAP = fakePost['empty-array-params']

const reqAPUrl = `http://example-base.com/fake-post/array-params`
const reqOPUrl = `http://example-base.com/fake-post/object-params`
const reqOHUrl = `http://example-test.com/fake-post/own-host`
const reqTAUrl = `http://example-base.com/fake-get/req-type-axios?asyncCp=asyncCp`
const reqEAPUrl = `http://example-base.com/fake-post/empty-array-params`

describe('error handling', () => {
    test('non-object params', () => {
        expect(reqAP('a')).rejects
            .toEqual(Error('请检查参数是否为对象！'))
    })

    test('error', () => {
        mock.onPost(reqEAPUrl).networkError()

        expect(reqEAP()).rejects.toEqual(Error('Network Error'))
    })

    test('must pass required params', () => {
        expect(reqOP()).rejects.toEqual(Error(`object-params：必须传递参数 param3！请检查！`))
    })
})

describe('fake get requests', () => {
    test('req-type-axios', () => {
        const data = { code: 0, data: 'req-type-axios' }
        mock.onGet(reqTAUrl).reply(200, data)

        return reqTA().then((resData) => {
            expect(resData).toEqual(data)
        })
    })
})

describe('fake post requests', () => {
    test('own-host', () => {
        const data = { code: 0, data: 'own-host' }
        mock.onPost(reqOHUrl).reply(200, data)

        return reqOH().then((resData) => {
            expect(resData).toEqual(data)
        })
    })

    test('empty-array-params', () => {
        const data = { code: 0, data: 'object data' }
        mock.onPost(reqEAPUrl).reply(200, data)

        return reqEAP().then((resData) => {
            expect(resData).toEqual(data)
        })
    })

    test('array-params', () => {
        const data = { code: 0, data: 'object data' }
        mock.onPost(reqAPUrl).reply(200, data)

        return reqAP(params).then((resData) => {
            expect(resData).toEqual(data)
        })
    })

    test('array-data', () => {
        const data = [ 0, 'array data' ]
        mock.onPost(reqOPUrl).reply(200, data)

        return reqOP({ param3: 'steve' }).then((resData) => {
            expect(resData).toEqual({ code: 0, data: 'array data' })
        })
    })
})
