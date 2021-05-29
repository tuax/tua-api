// mock wx
global.wx = {
  request: jest.fn(({
    fail,
    success,
    complete,
  }) => {
    setTimeout(() => {
      complete && complete()

      const { isTestFail, testData } = wx.__TEST_DATA__
      if (isTestFail) return fail(Error('test'))

      success && success({ data: testData })
    }, 0)
  }),
  hideLoading: jest.fn(),
  showLoading: jest.fn(),
  hideNavigationBarLoading: jest.fn(),
  showNavigationBarLoading: jest.fn(),

  // 测试数据
  __TEST_DATA__: {
    isTestFail: false,
    testData: null,
  },
}
