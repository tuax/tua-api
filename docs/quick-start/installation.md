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

### 安装武器
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

::: tip
不推荐使用 jsonp 的方式，有以下几个原因：

1.频繁报错，并且报错信息比较含糊

2.为了使用缓存一般添加 callbackName，但是重复请求会报错
:::

## 小程序端
### 安装本体

```bash
$ npm i -S tua-api
# OR
$ yarn add tua-api
```

**注意并非直接导入！**，因为正宫是 web 端...

```js
import TuaApi from 'tua-api/dist/mp'
```

或者在 webpack 配置中，设置 `alias`。

::: tip
小程序还用不了 npm？[@tua-mp/service](https://tuateam.github.io/tua-mp/tua-mp-service/) 了解一下？
:::
