export default {
  // 该参数表示请求的公用服务器地址。
  baseUrl: 'http://example-base.com/',

  // 请求的中间路径，建议与文件同名，以便后期维护。
  prefix: 'fake-fn',

  // 所有请求都需要携带的参数
  commonParams: (args) => ({
    ...args,
    c: Math.random(),
  }),

  reqType: 'axios',

  // 接口地址数组
  pathList: [
    /**
        * fn-params
        */
    {
      name: 'fp',
      path: 'fn-params',
      method: 'post',
      params: ({ param1, param2 }) => ({
        t: Math.random(),
        p1: param1,
        p2: param2,
      }),
    },
  ],
}
