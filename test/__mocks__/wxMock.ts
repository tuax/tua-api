// mock wx
// @ts-ignore
global.wx = {
    request: jest.fn(({
        fail,
        success,
        complete,
    }) => {
        setTimeout(() => {
            complete && complete({ errMsg: 'ok' })

            const { isTestFail, testData } = wx.__TEST_DATA__
            if (isTestFail) return fail && fail({ errMsg: 'test' })

            success && success({ data: testData, cookies: [''], header: {}, statusCode: 200, errMsg: '' })
        }, 0)

        return {
            abort: jest.fn(),
            onHeadersReceived: jest.fn(),
            offHeadersReceived: jest.fn(),
        }
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
