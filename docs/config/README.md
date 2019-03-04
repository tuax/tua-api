# 配置说明
在 `tua-api` 中配置分为四种：

* [默认配置（调用 `new TuaApi({ ... })` 时传递的）](./default.md)
* [公共配置（和 `pathList` 同级的配置）](./common.md)
* [自身配置（`pathList` 数组中的对象上的配置）](./self.md)
* [运行配置（在实际调用接口时传递的配置）](./runtime.md) <Badge text="1.0.0+"/>

其中优先级自然是:

`默认配置 < 公共配置 < 自身配置 < 运行配置`
