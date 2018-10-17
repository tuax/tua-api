export default {
    // 请求的公用服务器地址。
    // host: 'http://example-base.com/',

    // 请求的中间路径，建议与文件同名，以便后期维护。
    prefix: 'fake-get',

    // 所有请求都需要携带的参数
    commonParams: null,

    // 透传 `fetch-jsonp` 需要配置的参数。例如需要传递超时时间时可添加：
    jsonpOptions: { timeout: 10 * 1000 },

    // 透传 `axios` 需要配置的参数。例如需要传递超时时间时可添加：
    axiosOptions: { timeout: 10 * 1000 },

    // 是否使用在 index.js 中定义的全局中间件，默认为 true
    useGlobalMiddleware: false,

    // 中间件函数数组
    middleware: [
        // (ctx, next) => {
        //     // 请求发起前
        //     console.log('before: ', ctx)

        //     return next().then(() => {
        //         // 响应返回后
        //         console.log('after: ', ctx)
        //     })
        // },
    ],

    // 接口地址数组
    pathList: [
        /**
         * empty-array-params
         */
        {
            path: 'empty-array-params',
        },
        /**
         * array-params
         */
        {
            path: 'array-params',
            params: ['param1', 'param2'],
            // 在这里定义将覆盖公共中间件
            middleware: [],
        },
        /**
         * object-params
         */
        {
            path: 'object-params',
            reqType: '',
            params: {
                param1: 1217,
                param2: 'steve',
                // isRequired 或者 required 都行
                param3: { required: true },
            },
        },
        /**
         * async-common-params
         */
        {
            path: 'async-common-params',
            params: [],
            // 在这里返回的 params 会和请求的 params 合并
            beforeFn: () => Promise.resolve({
                params: { asyncCp: 'asyncCp' },
            }),
        },
        /**
         * req-type-axios
         */
        {
            path: 'req-type-axios',
            // 用哪个包发起请求目前支持：jsonp、axios
            // 如果不指定默认对于 get 请求使用 fetch-jsonp，post 请求使用 axios
            reqType: 'axios',
            // 在这里返回的 params 会和请求的 params 合并
            beforeFn: () => Promise.resolve({
                params: { asyncCp: 'asyncCp' },
            }),
        },
        /**
         * invalid-req-type
         */
        {
            path: 'invalid-req-type',
            reqType: 'foobar',
        },
    ],
}
