import {
  getSyncFnMapByApis,
  getPreFetchFnKeysBySyncFnMap,
} from '@/exportUtils'

const noop1 = () => {}
noop1.key = 'noop1'
noop1.params = []
const noop2 = () => {}
noop2.key = 'noop2'
noop2.params = {}
const noop3 = () => {}
noop3.key = 'noop3'
noop3.params = { a: { required: true } }
const noop4 = () => {}
noop4.key = 'noop4'
noop4.params = {}

const syncFnMap = getSyncFnMapByApis({
  api1: { path1: noop1, path2: noop2 },
  api2: { path1: noop3, path2: noop4 },
})

test('getSyncFnMapByApis', () => {
  expect(syncFnMap).toEqual({ noop1, noop2, noop3, noop4 })
})

test('getPreFetchFnKeysBySyncFnMap', () => {
  expect(getPreFetchFnKeysBySyncFnMap(syncFnMap)).toEqual([
    { key: 'noop2' },
    { key: 'noop4' },
  ])
})
