export default {
    // 该参数表示请求的公用服务器地址。
    host: 'http://example-base.com/',

    // 该参数表示请求的中间路径，建议与文件同名，以便后期维护。
    prefix: 'fake-wx',

    // 所有请求类型（可选值 OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT）
    type: 'post',

    // 所有请求都需要携带的参数，例如小程序中的所有接口都要携带以下参数 `from=miniprogram`
    commonParams: { from: 'miniprogram' },

    // 是否使用在 index.js 中定义的全局中间件，默认为 true
    useGlobalMiddleware: false,

    // 所有请求发起时是否自动展示 loading（默认为 true）
    // isShowLoading: true,

    // 中间件函数数组
    // middleware: [],

    // 接口地址数组
    pathList: [
        /**
         * fail
         */
        {
            path: 'fail',
            beforeFn: () => Promise.resolve({
                header: { cookie: '123' },
            }),
            useGlobalMiddleware: true,
        },
        /**
         * array-data
         */
        {
            path: 'array-data',
            name: 'arrayData',
            type: 'get',
            params: ['param1', 'param2'],
        },
        /**
         * object-data
         */
        {
            path: 'object-data',
            params: {
                param1: 1217,
                param2: 'steve',
                param3: { isRequired: true },
            },
        },
        /**
         * no-beforeFn
         */
        {
            path: 'no-beforeFn',
        },
        /**
         * hide-loading
         */
        {
            path: 'hide-loading',
            // 这个接口不需要展示 loading
            isShowLoading: false,
        },
        /**
         * type-get
         */
        {
            path: 'type-get',
            // 这个接口单独配置类型
            type: 'get',
        },
        /**
         * unknown-type
         */
        {
            path: 'unknown-type',
            // 这个接口单独配置类型
            type: 'foo',
        },
        /**
         * nav-loading
         */
        {
            path: 'nav-loading',
            showLoadingFn: wx.showNavigationBarLoading,
            hideLoadingFn: wx.hideNavigationBarLoading,
        },
    ],
}
