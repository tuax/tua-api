# 中间件进阶
在这一节中聊聊中间件该怎么用、注意事项、参数含义等等。

```js
export default {
    middleware: [ fn1, fn2, fn3 ],
}
```

## 中间件执行顺序
koa 中间件的执行顺序和 redux 的正好相反，例如以上写法会以以下顺序执行：

`请求参数 -> fn1 -> fn2 -> fn3 -> 响应数据 -> fn3 -> fn2 -> fn1`

## 中间件写法

* 普通函数：注意一定要 `return next()` 否则 `Promise` 链就断了！
* async 函数：注意一定要 `await next()`！

```js
// 普通函数，注意一定要 return next()
function (ctx, next) {
    ctx.req       // 请求的各种配置
    ctx.res       // 响应，但这时还未发起请求，所以是 undefined！
    ctx.startTime // 发起请求的时间

    // 传递控制权给下一个中间件
    return next().then(() => {
        // 注意这里才有响应！
        ctx.res       // 响应对象
        ctx.res.data  // 响应的数据
        ctx.reqTime   // 请求花费的时间
        ctx.endTime   // 收到响应的时间
    })
}

// async/await
async function (ctx, next) {
    ctx.req // 请求的各种配置

    // 传递控制权给下一个中间件
    await next()

    // 注意这里才有响应！
    ctx.res // 响应对象
}
```

## 中间件参数

以下是挂在 ctx 下的各种属性，业务侧的中间件可以改写其中某些属性达到在请求发起前，以及在收到响应后进行某些操作。

| 已使用的属性名 | 含义和作用 |
| --- | --- |
| req | 请求 |
| req.host | 服务器地址 |
| req.mock | 模拟的响应数据或是生成数据的函数 |
| req.type <badge text="2.0.0-" /> | 接口请求类型 get/post... |
| req.method <badge text="1.3.5+" /> | 接口请求类型 get/post... |
| req.path | 接口结尾路径 |
| req.prefix | 接口前缀 |
| req.reqType | 使用什么工具发(axios/jsonp/wx) |
| req.reqParams | 已添加默认参数的请求参数 |
| req.callbackName | 使用 jsonp 时的回调函数名 |
| req.axiosOptions | 透传 axios 配置参数 |
| req.jsonpOptions | 透传 fetch-jsonp 配置参数|
| req.reqFnParams | 发起请求时的参数对象（上面那些参数都会被放进来作为属性） |
| --- | --- |
| res | 响应 |
| res.data | 响应的数据 |
| res.error | 错误对象（可以取 stack 和 message） |
| res.* | [透传 axios 的配置](https://github.com/axios/axios#response-schema) |
| --- | --- |
| reqTime | 请求花费的时间 |
| startTime | 请求开始时的时间戳 |
| endTime | 收到响应时的时间戳 |
