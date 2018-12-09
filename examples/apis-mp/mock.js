export default {
    // 该参数表示请求的公用服务器地址。
    host: 'http://example-base.com/',

    // 该参数表示请求的中间路径，建议与文件同名，以便后期维护。
    prefix: 'mock',

    // 所有请求类型（可选值 OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT）
    type: 'get',

    // 公共 mock
    mock: ({ __mockData__ }) => __mockData__,

    pathList: [
        // 自身的 mock 配置优先级更高
        { path: 'foo', mock: { code: 500 } },

        // 没填自身 mock，则默认使用公共 mock
        { path: 'bar' },

        // 禁用 mock
        { path: 'null', mock: null },
    ],
}
