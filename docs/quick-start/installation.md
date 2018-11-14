# 安装
## web 端
### 安装本体

```bash
$ npm i -S tua-api
# OR
$ yarn add tua-api
```

然后直接导入即可

```js
import TuaApi from 'tua-api'
```

#### 配置武器
配置“武器”分为两种情况:

* [已配置 CORS 跨域请求头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)，或是没有跨域需求时，无需任何操作（默认采用的就是 `axios`）。

* 若是用不了 CORS，那么就需要设置 `reqType: 'jsonp'` 借助 jsonp 实现跨域

但是 jsonp 只支持使用 get 的方式请求，所以如果需要发送 post 或其他方式的请求，还是需要使用 `axios`（服务端还是需要配置 CORS）。

::: tip
不推荐使用 jsonp 的方式，有以下几个原因：

1.频繁报错，并且报错信息比较含糊

2.为了使用缓存一般添加 callbackName，但是重复请求会报错
:::

## 小程序端
### 安装本体即可

```bash
$ npm i -S tua-api
# OR
$ yarn add tua-api
```

```js
import TuaApi from 'tua-api'

const tuaApi = new TuaApi({ reqType: 'wx' })
```

::: tip
小程序还用不了 npm？[@tua-mp/service](https://tuateam.github.io/tua-mp/tua-mp-service/) 了解一下？
:::
