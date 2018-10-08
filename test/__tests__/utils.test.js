import {
    upperFirst,
    promisifyWxApi,
    checkArrayParams,
    getDefaultParamObj,
    getParamStrFromObj,
    hyphenCaseToCamelCase,
    apiConfigToReqFnParams,
} from '../../src/utils/'

test('upperFirst', () => {
    expect(upperFirst('')).toBe('')
    expect(upperFirst('aaa')).toBe('Aaa')
})

test('hyphenCaseToCamelCase', () => {
    expect(hyphenCaseToCamelCase('')).toBe('')
    expect(hyphenCaseToCamelCase('a-b-c')).toBe('aBC')
    expect(hyphenCaseToCamelCase('a-bc-de')).toBe('aBcDe')
})

test('promisifyWxApi', () => {
    const fn = ({ success }) => setTimeout(() => success('test'), 0)
    const promisifiedFn = promisifyWxApi(fn)

    promisifiedFn().then(data => {
        expect(data).toBe('test')
    })
})

test('checkArrayParams', () => {
    expect(checkArrayParams({ params: {} })).toBe(true)
    expect(checkArrayParams({ args: { a: 'a' }, params: ['a'] })).toBe(true)
    expect(checkArrayParams({ args: {}, params: ['a'] })).toBe(false)
})

test('getDefaultParamObj', () => {
    expect(getDefaultParamObj({
        commonParams: { a: '1' },
    })).toEqual({ a: '1' })

    expect(getDefaultParamObj({
        args: { a: '1' },
        params: { b: '2' },
    })).toEqual({ b: '2' })

    expect(getDefaultParamObj({
        args: { a: '1' },
        params: { b: '2' },
        commonParams: { c: '3' },
    })).toEqual({ b: '2', c: '3' })

    expect(() => getDefaultParamObj({
        params: { b: { required: true } },
        apiName: 'steve',
    })).toThrow('steve：必须传递参数 b！请检查！')

    expect(() => getDefaultParamObj({
        params: { c: { isRequired: true } },
        apiName: 'steve',
    })).toThrow('steve：必须传递参数 c！请检查！')
})

test('getParamStrFromObj', () => {
    expect(getParamStrFromObj()).toBe('')
    expect(getParamStrFromObj({})).toBe('')
    expect(getParamStrFromObj({ a: 1, b: 2 })).toBe('a=1&b=2')
    expect(getParamStrFromObj({ a: 1, b: 2, c: '哈喽' })).toBe('a=1&b=2&c=%E5%93%88%E5%96%BD')
})

test('apiConfigToReqFnParams', () => {
    expect(apiConfigToReqFnParams({
        pathList: [
            { path: 'api1', a: 'aa' },
            { path: 'api2', b: 'bb' },
        ],
        a: 'a',
        b: 'b',
    })).toEqual([
        { path: 'api1', a: 'aa', b: 'b' },
        { path: 'api2', a: 'a', b: 'bb' },
    ])
})
