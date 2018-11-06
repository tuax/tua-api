<h1 align="center">tua-api</h1>

<h5 align="center">
    让我们优雅地调用 api~
</h5>

<p align="center">
    <a href="https://tuateam.github.io/tua-api/">👉完整文档地址点这里👈</a>
</p>

<p align="center">
    <a href="https://circleci.com/gh/tuateam/tua-api/tree/master"><img src="https://img.shields.io/circleci/project/github/tuateam/tua-api/master.svg" alt="Build Status"></a>
    <a href="https://codecov.io/github/tuateam/tua-api?branch=master"><img src="https://img.shields.io/codecov/c/github/tuateam/tua-api/master.svg" alt="Coverage Status"></a>
    <a href="https://www.npmjs.com/package/tua-api"><img src="https://img.shields.io/npm/v/tua-api.svg" alt="Version"></a>
    <a href="https://www.npmjs.com/package/tua-api"><img src="https://img.shields.io/npm/l/tua-api.svg" alt="License"></a>
</p>

## `tua-api` 是什么？
`tua-api` 是一个针对发起 api 请求提供辅助功能的库。采用 ES6+ 语法，将全部 api 使用 Promise 包裹，并采用 jest 进行了完整的单元测试。

目前已适配：

* web 端：`tua-api`
* 小程序端：`tua-api/dist/mp`

## 安装
### web 端
#### 安装本体

```bash
$ npm i -S tua-api
# OR
$ yarn add tua-api
```

然后直接导入即可

```js
import TuaApi from 'tua-api'
```

#### 安装武器
安装“武器”分为两种情况:

* [已配置 CORS 跨域请求头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)，或是没有跨域需求时，那么再装一个 `axios` 即可

```bash
$ npm i -S axios
# OR
$ yarn add axios
```

* 若是用不了 CORS，那么就需要装 `fetch-jsonp` 借助 jsonp 实现跨域

```bash
$ npm i -S fetch-jsonp
# OR
$ yarn add fetch-jsonp
```

但是 jsonp 只支持使用 get 的方式请求，所以如果需要发送 post 或其他方式的请求，还是需要装 `axios`。

### 小程序端
#### 安装本体

```bash
$ npm i -S tua-api
# OR
$ yarn add tua-api
```

**注意并非直接导入！**因为正宫是 web 端...

```js
import TuaApi from 'tua-api/dist/mp'
```

或者在 webpack 配置中，设置 `alias`。

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

const storage = new TuaStorage({ ... })

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

storage
    .load(fetchParam)
    .then(console.log)
    .catch(console.error)
```

## 怎么写 `api` 配置？
拿以下 api 地址举例：

* https://example-base.com/foo/bar/something/create
* https://example-base.com/foo/bar/something/modify
* https://example-base.com/foo/bar/something/delete

### 地址结构划分
以上地址，一般将其分为`3`部分：

* host: `'https://example-base.com/foo/bar/'`
* prefix: `'something'`
* pathList: `[ 'create', 'modify', 'delete' ]`

### 文件结构
`api/` 一般是这样的文件结构：

```
.
└── apis
    ├── prefix-1.js
    ├── prefix-2.js
    ├── something.js // <-- 以上的 api 地址会放在这里
    └── index.js
```

### 基础配置内容
```js
// src/apis/something.js

export default {
    // 请求的公用服务器地址。
    host: 'http://example-base.com/foo/bar/',

    // 请求的中间路径，建议与文件同名，以便后期维护。
    prefix: 'something',

    // 接口地址数组
    pathList: [
        { path: 'create' },
        { path: 'modify' },
        { path: 'delete' },
    ],
}
```

[更多配置请点击这里查看](./docs/config/default.md)

### 配置导出
最后来看一下 `apis/index.js` 该怎么写：

```js
import TuaApi from 'tua-api' // 小程序用 dist/mp

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

小程序端建议使用 [@tua-mp/cli](https://tuateam.github.io/tua-mp/tua-mp-cli/) 一键生成 api。

```bash
$ tuamp add api <api-name>
```

### 配置的构成
在 `tua-api` 中配置分为三种：

* 默认配置（调用 `new TuaApi({ ... })` 时传递的）
* 公共配置（和 `pathList` 同级的配置）
* 自身配置（`pathList` 数组中的对象上的配置）

其中优先级自然是:

`自身配置 > 公共配置 > 默认配置`

<p align="center">
    <a href="https://tuateam.github.io/tua-api/config/">👉更多配置点击这里👈</a>
</p>
