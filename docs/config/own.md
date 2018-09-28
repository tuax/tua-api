# 自身配置
自身配置指的是填写在 `pathList` 中的配置。这部分的配置优先级最高。

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
