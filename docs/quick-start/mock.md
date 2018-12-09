# 数据 mock
## 静态配置
即将 mock 数据直接填在该接口的配置中。

### 简单对象
简单粗暴，填数据就完事儿了~

```js
{
    pathList: [
        // 以 foo 接口为例
        {
            path: 'foo',

            // 对象形式
            mock: { code: 0, data: 'some data' },
        },
    ],
}
```

### mock 函数
使用函数形式，用法上会更灵活一些。

```js
{
    pathList: [
        // 以 foo 接口为例
        {
            path: 'foo',

            // 函数形式
            mock: (params) => ({
                code: params.mockCode,
                data: params.mockData,
            }),
        },
    ],
}
```

::: tip
`params` 即最终传入接口的参数对象。
:::

```js
import { exampleApi } from '@/apis/'

// 填写 mock 数据
const mockCode = 0
const mockData = { foo: 'bar' }

// 请求将收到 mock 数据
exampleApi.foo({ mockCode, mockData })
    .then(({ code, data }) => {
        console.log(code, data) // 0 {foo: "bar"}
    })
```

### 多接口公共 mock
mock 属性不仅可以填在各个接口处，也可以将其放在上一级，mock 当前配置中的所有接口。

```js
{
    // 公共 mock
    mock: ({ __mockData__ }) => __mockData__,

    pathList: [
        // 自身的 mock 配置优先级更高
        { path: 'foo', mock: { code: 0 } },

        // 没填自身 mock，则默认使用公共 mock
        { path: 'bar' },

        // 禁用 mock
        { path: 'null', mock: null },
    ],
}
```

```js
import { exampleApi } from '@/apis/'

const __mockData__ = { code: 123 }

// 使用自己定义 mock 数据
exampleApi.foo({ __mockData__ })
    .then(({ code }) => {
        console.log(code) // 0
    })

// 使用公共的 mock 数据
exampleApi.bar({ __mockData__ })
    .then(({ code }) => {
        console.log(code) // 123
    })
```

更多配置优先级内容请参阅[配置说明](../config/)部分。

## 动态配置
即为每个导出的 `api` 函数添加 `mock` 属性，在业务侧用以下方式调用。

```js
import { exampleApi } from '@/apis/'

// 填写 mock 数据
exampleApi.foo.mock = {
    code: 0,
    data: { foo: 'bar' },
}

// 同样支持 mock 函数
exampleApi.foo.mock = () => ({
    code: 0,
    data: { foo: 'bar' },
})

// 请求将收到 mock 数据
exampleApi.foo().then(({ code, data }) => {
    console.log(code, data) // 0 {foo: "bar"}
})
```

## 同时配置
### 优先级
若是同时配置了静态和动态 mock，动态配置的 mock 数据优先级更高。

::: tip
优先级：动态 > 静态
:::

* 接口配置
```js
{
    pathList: [
        {
            path: 'foo',
            mock: (params) => ({ code: params.mockCode }),
        },
    ],
}
```

* 业务侧
```js
import { exampleApi } from '@/apis/'

// 动态配置的数据将覆盖静态配置的数据
exampleApi.foo.mock = { code: 1 }

exampleApi.foo({ mockCode: 0 })
    .then(({ code }) => {
        console.log(code) // 1
    })
```

### 关闭 mock
可以通过以下代码实现关闭 mock 功能。

```js
import { exampleApi } from '@/apis/'

// 关闭 mock
exampleApi.foo.mock = null

// 即使传递 mock 数据也不起作用
exampleApi.foo({ mockCode: 404 })
    .then(({ code }) => {
        console.log(code) // 实际接口的返回值
    })
```

::: tip
其实动态配置 `exampleApi.foo.mock` 的默认值就是静态配置的值，而在 `tua-api` 底层读取的就是 `exampleApi.foo.mock`。

所以自然动态配置的优先级更高，并且赋值为 `null` 即可关闭 mock。
:::
