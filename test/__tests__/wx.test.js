import { fakeWxApi } from '../../examples/apis-mp/'

const reqF = fakeWxApi['fail']
const reqAD = fakeWxApi['array-data']
const reqOD = fakeWxApi['object-data']
const reqNB = fakeWxApi['no-beforeFn']
const reqHL = fakeWxApi['hide-loading']
const reqTG = fakeWxApi['type-get']
const reqUT = fakeWxApi['unknown-type']
const reqNL = fakeWxApi['nav-loading']

const testObjData = { code: 0, data: 'object data' }
const testArrData = [ 0, 'array data' ]

describe('fake wx requests', () => {
    beforeEach(() => {
        wx.__TEST_DATA__ = {}
    })

    test('object-data', () => {
        wx.__TEST_DATA__ = { testData: testObjData }

        return reqOD({ param3: '123' }).then((resData) => {
            expect(resData).toEqual({ code: 0, data: 'object data' })
        })
    })

    test('array-data', () => {
        wx.__TEST_DATA__ = { testData: testArrData }

        return reqAD(null).then((resData) => {
            expect(resData).toEqual({ code: 0, data: 'array data' })
        })
    })

    test('fail', () => {
        wx.__TEST_DATA__ = { isTestFail: true }

        return expect(reqF({ a: 'b' })).rejects.toEqual(Error('test'))
    })

    test('no-beforeFn', () => (
        expect(reqNB()).rejects.toEqual(Error('没有数据'))
    ))

    test('hide-loading', () => {
        wx.showLoading.mockClear()
        wx.__TEST_DATA__ = { testData: testObjData }

        return reqHL().then((resData) => {
            expect(resData).toEqual({ code: 0, data: 'object data' })
            expect(wx.showLoading).toHaveBeenCalledTimes(0)
        })
    })

    test('type-get', () => {
        wx.showLoading.mockClear()
        wx.__TEST_DATA__ = { testData: testObjData }

        return reqTG().then(() => {
            const [[{ method }]] = wx.request.mock.calls
            expect(method).toBe('GET')
            expect(wx.showLoading).toHaveBeenCalledTimes(1)
        })
    })

    test('unknown-type', () => {
        expect(reqUT()).rejects.toEqual(Error(`Unknown Method: FOO!!!`))
    })

    test('nav-loading', () => {
        wx.showNavigationBarLoading.mockClear()
        wx.__TEST_DATA__ = { testData: testObjData }

        return reqNL().then((resData) => {
            expect(resData).toEqual({ code: 0, data: 'object data' })
            expect(wx.showNavigationBarLoading).toHaveBeenCalledTimes(1)
        })
    })
})
