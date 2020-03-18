import {
    map,
    join,
} from '@/utils/'

describe('functional programming functions', () => {
    test('map', () => {
        const fn1 = <T>(x: T) => x
        const fn2 = (x: number) => x * 2
        const arr = [1, 2, 3]
        const obj = { a: 1, b: 2, c: 3 }

        expect(map(fn1)(arr)).toEqual(arr)
        expect(map(fn2)(obj)).toEqual({ a: 2, b: 4, c: 6 })
    })

    test('join', () => {
        expect(join()([])).toBe('')
        expect(join()(['1', '2'])).toBe('1,2')
        expect(join('&')([])).toBe('')
        expect(join('&')(['1', '2'])).toBe('1&2')
    })
})
