# 自身配置
自身配置指的是填写在 `pathList` 中的配置。这部分的配置优先级最高。

以下接口以导出为 `exampleApi` 为例。

## path 接口地址
```js
export default {
    pathList: [
        {
            path: 'foo-bar',
        },
    ],
}
```

即接口地址的最后部分。默认这样调用

```js
exampleApi['foo-bar']({ ... })
```

## name 接口名称（可省略）
```js
export default {
    pathList: [
        {
            path: 'foo-bar',
            name: 'fooBar',
        },
    ],
}
```

有时接口地址较长，可以添加 `name` 配置重命名接口，这样就可以这样调用

```js
exampleApi.fooBar({ ... })
```

## params 接口参数

```js
export default {
    pathList: [
        {
            path: 'create',
            // 数组形式（不推荐使用）
            params: [ 'a', 'b' ],
        },
        {
            path: 'modify',
            // 对象形式（推荐使用）
            params: {
                // 默认参数
                a: '1',
                // 表示该参数在调用时必须传，以下两种写法都行
                b: { required: true },
                c: { isRequired: true },
            },
        },
    ],
}
```

## commonParams 覆盖公共参数
有时某个接口正好不需要上一级中 `commonParams` 的参数。那么可以传递 `null` 覆盖上一级中的 `commonParams`。

## 其他参数
其他参数参阅上一节 [详细配置](./detail.md)
