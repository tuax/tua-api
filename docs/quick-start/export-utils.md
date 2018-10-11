# 辅助函数
## getSyncFnMapByApis
将所有的 api 对象拍平成一个 Map，与 `tua-storage` 配合使用可以将各个发起 `api` 的函数的 `key` 与其自身绑定。

## getPreFetchFnKeysBySyncFnMap
过滤出有默认参数的接口（接口参数非数组，且不含有 isRequired）。

适用于 node 端发起请求预取数据的场景。
