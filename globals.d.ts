interface Wx extends WechatMiniprogram.Wx {
    hideLoading: jest.Mocked<any>
    showLoading: jest.Mocked<any>
    hideNavigationBarLoading: jest.Mocked<any>
    showNavigationBarLoading: jest.Mocked<any>

    // just for test
    __TEST_DATA__: {
        testData?: any
        isTestFail?: boolean
    }
}

declare const wx: Wx

declare namespace NodeJS {
    interface Global {
        wx: Wx
    }
}
