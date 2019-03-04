# 运行配置 <Badge text="1.0.0+"/>
运行配置指的是在接口实际调用时通过第二个参数传递的配置。这部分的配置优先级最高。

以下接口以导出为 `exampleApi` 为例。

```js
exampleApi.foo(
    { ... }, // 第一个参数传接口参数
    { ... }  // 第二个参数传接口配置
)
```

## callbackName 回调函数名称
在通过 jsonp 发起请求时，为了使用缓存一般需要添加 callbackName，但是注意重复请求时会报错。

```js
exampleApi.foo(
    { ... },
    { callbackName: `foo` }
)
```

## 其他参数
公共配置一节中的所有参数（除了 `pathList` 外），以及自身配置一节中的所有参数均有效，且优先级最高。

* 详情参阅[公共配置](./common.md)
* 详情参阅[自身配置](./self.md)
