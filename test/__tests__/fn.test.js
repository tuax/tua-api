import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import fakeFnConfig from '@examples/apis-web/fake-fn'
import { fakeFnApi } from '@examples/apis-web/'

const mock = new MockAdapter(axios)

const params = { param1: 'steve', param2: 'young' }
const reqFPUrl = 'http://example-base.com/fake-fn/fn-params'

describe('function params', () => {
  beforeEach(() => {
    // @ts-ignore
    mock.resetHistory()
  })

  test('should support function type params', async () => {
    Math.random = jest.fn(() => 'foo')
    mock.onPost(reqFPUrl).reply(200, {})
    await fakeFnApi.fp(params)

    const { data } = mock.history.post[0]
    expect(data).toEqual(JSON.stringify({
      ...fakeFnConfig.commonParams(params),
      t: 'foo',
      p1: params.param1,
      p2: params.param2,
    }))
  })
})
