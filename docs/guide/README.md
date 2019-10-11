# 介绍
## `tua-api` 是什么？
`tua-api` 是一个针对发起 api 请求提供辅助功能的库。采用 ES6+ 语法，并采用 jest 进行了完整的单元测试。

目前已适配：

* web 端：axios, fetch-jsonp
* Node 端：axios
* 小程序端：wx.request

## `tua-api` 能干什么？
`tua-api` 能实现统一管理 api 配置（例如一般放在 `src/apis/` 下）。经过处理后，业务侧代码只需要这样写即可：

```js
import { fooApi } from '@/apis/'

fooApi
    .bar({ a: '1', b: '2' }) // 发起请求，a、b 是请求参数
    .then(console.log)       // 收到响应
    .catch(console.error)    // 处理错误
```

不仅如此，还有一些其他功能：

* 参数校验
* 默认参数
* 中间件（koa 风格）
* ...

```js
// 甚至可以更进一步和 tua-storage 配合使用
import TuaStorage from 'tua-storage'
import { getSyncFnMapByApis } from 'tua-api'

// 本地写好的各种接口配置
import * as apis from '@/apis'

const tuaStorage = new TuaStorage({
    syncFnMap: getSyncFnMapByApis(apis),
})

const fetchParam = {
    key: fooApi.bar.key,
    syncParams: { a: 'a', b: 'b' },

    // 过期时间，默认值为实例化时的值，以秒为单位
    expires: 10,

    // 是否直接调用同步函数更新数据，默认为 false
    // 适用于需要强制更新数据的场景，例如小程序中的下拉刷新
    isForceUpdate: true,

    // ...
}

tuaStorage
    .load(fetchParam)
    .then(console.log)
    .catch(console.error)
```

## 怎么写 `api` 配置？
拿以下 api 地址举例：

* `https://example-base.com/foo/bar/something/create`
* `https://example-base.com/foo/bar/something/modify`
* `https://example-base.com/foo/bar/something/delete`

### 地址结构划分
以上地址，一般将其分为`3`部分：

* baseUrl: `'https://example-base.com/foo/bar'`
* prefix: `'something'`
* pathList: `[ 'create', 'modify', 'delete' ]`

### 文件结构
`api/` 一般是这样的文件结构：

```
.
└── apis
    ├── prefix-1.js
    ├── prefix-2.js
    ├── something.js // <-- 以上的 api 地址会放在这里，名字随意
    └── index.js
```

### 基础配置内容
```js
// src/apis/something.js

export default {
    // 接口基础地址
    baseUrl: 'https://example-base.com/foo/bar',

    // 接口的中间路径
    prefix: 'something',

    // 接口地址数组
    pathList: [
        { path: 'create' },
        { path: 'modify' },
        { path: 'delete' },
    ],
}
```

[更多配置请点击这里查看](../config/common.md)

### 配置导出
最后来看一下 `apis/index.js` 该怎么写：

```js
import TuaApi from 'tua-api'

// 初始化
const tuaApi = new TuaApi({ ... })

// 使用中间件
tuaApi
    .use(async (ctx, next) => {
        // 请求发起前
        console.log('before: ', ctx)

        await next()

        // 响应返回后
        console.log('after: ', ctx)
    })
    // 链式调用
    .use(...)

export const fakeGet = tuaApi.getApi(require('./fake-get').default)
export const fakePost = tuaApi.getApi(require('./fake-post').default)
```

::: tip
小程序端建议使用 [@tua-mp/cli](https://tuateam.github.io/tua-mp/tua-mp-cli/) 一键生成 api。

```bash
$ tuamp add api <api-name>
```
:::

[配置的详细说明点这里](../config/)
