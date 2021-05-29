import {
  map,
  pipe,
  join,
  merge,
  concat,
  filter,
  reduce,
  compose,
  flatten,
  mergeAll,
} from '@/utils/'

describe('functional programming functions', () => {
  test('map', () => {
    const fn1 = x => x
    const fn2 = x => x * 2
    const arr = [1, 2, 3]
    const obj = { a: 1, b: 2, c: 3 }

    expect(map(fn1)(arr)).toEqual(arr)
    expect(map(fn2)(obj)).toEqual({ a: 2, b: 4, c: 6 })
  })

  test('pipe', () => {
    const double = x => x * 2
    const square = x => x * x

    expect(pipe()(5)).toBe(5)
    expect(pipe(square)(5)).toBe(25)
    expect(pipe(square, double)(5)).toBe(50)
    expect(pipe(double, square, double)(5)).toBe(200)
  })

  test('join', () => {
    expect(join()([])).toBe('')
    expect(join()([1, 2])).toBe('1,2')
    expect(join('&')([])).toBe('')
    expect(join('&')([1, 2])).toBe('1&2')
  })

  test('merge', () => {
    const obj = { a: 'a', b: 'b' }

    expect(merge(obj, { c: 'c' })).toEqual({ a: 'a', b: 'b', c: 'c' })
    expect(merge(obj, { b: 'c' })).toEqual({ a: 'a', b: 'c' })
  })

  test('concat', () => {
    expect(concat([])([])).toEqual([])
    expect(concat([])([1, 2])).toEqual([1, 2])
    expect(concat([1, 2])([3, 4])).toEqual([3, 4, 1, 2])
  })

  test('reduce', () => {
    const fn = (x, y) => x + y
    const arr = [1, 2, 3]

    expect(reduce(fn)(arr)).toBe(6)
    expect(reduce(fn, 10)(arr)).toBe(16)
    expect(reduce(fn)([])).toBe(undefined)
  })

  test('filter', () => {
    const fn = x => x > 2
    const arr = [1, 2, 3]

    expect(filter(fn)(arr)).toEqual([3])
  })

  test('compose', () => {
    const double = x => x * 2
    const square = x => x * x

    expect(compose()(5)).toBe(5)
    expect(compose(square)(5)).toBe(25)
    expect(compose(square, double)(5)).toBe(100)
    expect(compose(double, square, double)(5)).toBe(200)
  })

  test('flatten', () => {
    const arr1 = [[1], [2], [3]]
    const arr2 = [[1], [2], [3, [4]]]

    expect(flatten(arr1)).toEqual([1, 2, 3])
    expect(flatten(arr2)).toEqual([1, 2, 3, 4])
  })

  test('mergeAll', () => {
    const arr = [
      { a: 'a' },
      { b: 'b' },
      { c: 'c' },
    ]

    expect(mergeAll(arr)).toEqual({
      a: 'a',
      b: 'b',
      c: 'c',
    })
  })
})
