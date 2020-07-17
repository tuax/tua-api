export default {
    // 该参数表示请求的公用服务器地址。
    baseUrl: 'http://example-base.com/',

    // 该参数表示请求的中间路径，建议与文件同名，以便后期维护。
    prefix: 'fake-post',

    /** @type { import('../../src/').Method } */
    method: ('post'),

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
        },
        /**
         * array-params
         */
        {
            name: 'ap',
            path: 'array-params',
            /** @type { import('../../src/').ReqType } */
            reqType: ('axios'),
            params: ['param1', 'param2'],
        },
        /**
         * array-params with new baseUrl
         */
        {
            name: 'hap',
            path: 'array-params',
            /** @type { import('../../src/').ReqType } */
            reqType: ('axios'),
            middleware: [
                async (ctx, next) => {
                    ctx.req.baseUrl = 'http://custom-baseUrl.com/'
                    await next()
                },
            ],
        },
        /**
         * object-params
         */
        {
            name: 'op',
            path: 'object-params',
            params: {
                param1: 1217,
                param2: 'steve',
                param3: { isRequired: true },
            },
        },
        /**
         * own-baseUrl
         */
        {
            name: 'oh',
            path: 'own-baseUrl',
            baseUrl: 'http://example-test.com/',
            params: {},
            // 表示这个接口不需要传递 commonParams
            commonParams: null,
        },
        /**
         * custom-transformRequest
         */
        {
            name: 'ct',
            path: 'custom-transformRequest',
            axiosOptions: {
                transformRequest: () => `ct`,
            },
        },
        /**
         * application/json
         */
        {
            name: 'pj',
            path: 'post-json',
        },
        /**
         * raw-data
         */
        {
            name: 'rd',
            path: 'raw-data',
            afterFn: ([, ctx]) => ctx.res.rawData,
        },
    ],
}
