export default {
    // 该参数表示请求的公用服务器地址。
    host: 'http://example-base.com/',

    // 该参数表示请求的中间路径，建议与文件同名，以便后期维护。
    prefix: 'fake-post',

    // 所有请求都需要携带的参数
    commonParams: { common: 'params' },

    // 中间件函数数组
    middleware: [],

    // 接口地址数组
    pathList: [
        /**
         * empty-array-params
         */
        {
            name: 'eap',
            path: 'empty-array-params',
            type: 'post',
        },
        /**
         * array-params
         */
        {
            name: 'ap',
            path: 'array-params',
            type: 'post',
            reqType: 'axios',
            params: ['param1', 'param2'],
        },
        /**
         * object-params
         */
        {
            name: 'op',
            path: 'object-params',
            type: 'post',
            params: {
                param1: 1217,
                param2: 'steve',
                param3: { isRequired: true },
            },
        },
        /**
         * own-host
         */
        {
            name: 'oh',
            path: 'own-host',
            type: 'post',
            host: 'http://example-test.com/',
            params: {},
            // 表示这个接口不需要传递 commonParams
            commonParams: null,
        },
    ],
}
