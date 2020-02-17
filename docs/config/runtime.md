# 运行配置 <Badge text="1.0.0+"/>
运行配置指的是在接口实际调用时通过第二个参数传递的配置。这部分的配置优先级最高。

以下接口以导出为 `exampleApi` 为例。

```js
exampleApi.foo(
    { ... }, // 第一个参数传接口参数
    { ... }  // 第二个参数传接口配置
)
```

## callback 回调函数参数的名称 <Badge text="1.4.4+"/>
通过 jsonp 发起请求时，在请求的 `url` 上都会有一个参数用来标识回调函数，例如 `callback=jsonp_1581908021389_16566`。

`callback` 这个参数可以用来标识等号左边的值（不填则默认为 `callback`）。

```js
exampleApi.foo(
    { ... },
    { callback: `cb` }
)
```

最终的请求 `url` 大概是：`/foo?cb=jsonp_1581908021389_16566`。

::: tip
`callback` 其实就是透传了 `fetch-jsonp` 中的 `jsonpCallback`。
:::

## callbackName 回调函数名称
通过 jsonp 发起请求时，一般默认回调函数的名称都是由一些随机值构成，例如 `callback=jsonp_1581908021389_16566`

不过为了使用缓存一般需要添加 `callbackName`，但是注意重复请求时会报错（此时不设置 `callbackName` 即可）。

```js
exampleApi.foo(
    { ... },
    { callbackName: `fooCallback` }
)
```

最终的请求 `url` 大概是：`/foo?callback=fooCallback`。

::: tip
`callbackName` 其实就是透传了 `fetch-jsonp` 中的 `jsonpCallbackFunction`。
:::

## 其他参数
公共配置一节中的所有参数（除了 `pathList` 外），以及自身配置一节中的所有参数均有效，且优先级最高。

* 详情参阅[公共配置](./common.md)
* 详情参阅[自身配置](./self.md)
