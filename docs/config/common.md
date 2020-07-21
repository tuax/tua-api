# 公共配置
详细地址指的是填写在 `src/apis/foobar.js` 中的一级配置。这部分的配置优先级比默认配置高，但低于各个接口的自身配置。

## type 请求类型 <badge text="2.0.0-" />
重命名为 `method`，`type` 属性将在 `2.0.0+` 后废弃。

## method 请求类型 <badge text="1.3.5+" />
所有请求类型（可忽略大小写，可选值 OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT）

```js
export default {
    // 忽略大小写
    method: 'post',
}
```

## host 接口基础地址 <badge text="2.0.0-" />
重命名为 `baseUrl`，`host` 属性将在 `2.0.0+` 后废弃。

## baseUrl 接口基础地址 <badge text="1.4.1+" />
```js
export default {
    baseUrl: 'https://example-api.com/',
}
```

## mock 模拟接口数据
* 类型：`Object`、`Function`
* 默认值：`{}`

模拟接口数据，可以直接填数据，或是填函数。函数将收到 `params` 参数对象，即最终发送给接口的数据对象。

```js
export default {
    // 对象形式
    mock: { code: 0, data: 'some data' },

    // 函数形式
    mock: (params) => ({
        code: params.mockCode,
        data: params.mockData,
    }),
}
```

详情参阅 [mock 章节](../guide/mock.md)

## prefix 接口中间地址
建议与文件同名，方便维护。

```js
export default {
    prefix: 'foobar',
}
```

## reqType 请求使用库类型
即用哪个库发起请求目前支持：jsonp、axios、wx，不填则使用默认配置中的 reqType。

```js
export default {
    reqType: 'jsonp',
}
```

## customFetch 自定义请求函数 <badge text="1.6.0+" />
适用于内置库覆盖不到的场景下使用，这是一个函数，将会接收接口相关配置，在函数内发起请求，返回值为一个 Promise。

```js
export default {
    customFetch: ({ url, data, method }) => {
        // ...
    },
}
```

::: warning
从优先级上来说这个参数和 `reqType` 互相替代，例如：
1. 低优先级的 `reqType` 会被高优先级的 `customFetch` 覆盖（反之亦然）
2. 若是 `reqType` 和 `customFetch` 在同级同时配置时，控制台发出告警，并且实际以 `customFetch` 为准。
:::

## commonParams 公共参数
有时对于所有接口都需要添加一个公共参数。

例如在小程序端，可能需要添加 `from` 参数标记这个接口是由小程序请求了。可以这么写：

```js
export default {
    commonParams: { from: 'miniprogram' },
}
```

## axiosOptions 透传参数配置
由于 tua-api 是依赖于 `axios` 或是 `fetch-jsop` 来发送请求的。所以势必要提供参数透传的功能。

```js
export default {
    // 透传 `fetch-jsonp` 需要配置的参数。例如需要传递超时时间时可添加：
    jsonpOptions: { timeout: 10 * 1000 },

    // 透传 `axios` 需要配置的参数。例如需要传递超时时间时可添加：
    axiosOptions: { timeout: 10 * 1000 },
}
```

## jsonpOptions 透传参数配置
同上

## middleware 中间件函数数组
中间件采用的是 koa 风格，所以对于一个 api 请求，从发起请求到收到响应你都有充分的控制权。

```js
export default {
    middleware: [ fn1, fn2, fn3 ],
}
```

详情参阅：[中间件进阶](../guide/middleware.md)

## header 请求头 <badge text="1.4.0+" />
> 注意：jsonp 的请求方式用不了哟

配置静态请求头，例如 `Content-Type` 默认为 `application/x-www-form-urlencoded`，可以这么配置进行修改。

```js
export default {
    header: {
        'Content-Type': 'application/json',
    },
}
```

::: tip
* 如果想要发送二进制数据可以参阅 [FormData](../guide/form-data.md#formdata) 章节
* 如果请求头上的一些数据是异步获取到的，比如小程序端的 `cookie`。建议配置下面的 `beforeFn` 函数或是中间件，异步设置请求头。
* <badge text="1.5.0+" /> 若当前以 `post` 的方式发送请求，且当前没有配置 `transformRequest` 时，`tua-api` 会自动调用 `JSON.stringify`，并设置 `Content-Type` 为 `'application/json'`。
:::

## beforeFn 发起请求前钩子函数
在请求发起前执行的函数，因为是通过 `beforeFn().then(...)` 调用，所以注意要返回 Promise。

例如小程序端可以通过返回 `header` 传递 `cookie`，web 端使用 axios 时也可以用来修改 `header`。

> 虽然 axios 配置是 `headers` 但为了和小程序端保持一致就都用 `header`

```js
export default {
    beforeFn: () => Promise.resolve({
        header: { cookie: '1' },
    }),
}
```

## afterFn 收到响应后的钩子函数
在收到响应后执行的函数，可以不用返回 `Promise`

> 注意接收的参数是一个【数组】 `[res.data, ctx]`

* 第一个参数是接口返回数据对象 `{ code, data, msg }`
* 第二个参数是请求相关参数的对象，例如有请求的 host、type、params、fullPath、reqTime、startTime、endTime 等等

默认值如下，即返回接口数据。

```js
const afterFn = ([x]) => x
```

::: warning
* 该函数若是返回了数据，则业务侧将收到这个数据。所以在这里可以添加一些通用逻辑，处理返回的数据。
* 该函数若是没有返回数据，业务侧也会收到 `res.data`。
:::

## isShowLoading (小程序 only)
所有请求发起时是否自动展示 loading（默认为 true）。

一般来说都是需要展示 loading 的，但是有些接口轮询时如果一直展示 loading 会很奇怪。

## showLoadingFn (小程序 only)
小程序中展示 loading 的方法：

* 默认值: `() => wx.showLoading({ title: '加载中' })`
* 可选值: `() => wx.showLoading(YOUR_OPTIONS)`
* 可选值: `wx.showNavigationBarLoading`
* 或者调用你自己定义的展示 loading 方法...

## hideLoadingFn (小程序 only)
小程序中隐藏 loading 的方法：

* 默认值: wx.hideLoading
* 可选值: wx.hideNavigationBarLoading
* 或者调用你自己定义的隐藏 loading 方法...

## useGlobalMiddleware 使用全局中间件
是否使用全局中间件，默认为 true。

适用于某些接口正好不需要调用在 `tua-api` 初始化时定义的全局中间件的情况。

## pathList 各个接口自身配置数组
这个数组中填写的是接口最后的地址。

```js
export default {
    pathList: [
        {
            path: 'create',
            // 覆盖公共 middleware
            middleware: [],
            // 覆盖公共 jsonpOptions
            jsonpOptions: {},
        },
        {
            path: 'modify',
            // 覆盖公共 axiosOptions
            axiosOptions: {},
        },
    ],
}
```

::: tip
在 pathList 的接口对象中填写的配置具有最高优先级！将会覆盖上一级的同名属性。
:::

`pathList` 中其他配置见下一节~
