# 辅助函数
## getAllApis
导出当前文件夹下所有接口，接收 api 文件夹路径，调用 fs 读取当前文件夹下的所有接口文件，生成 api 函数对象并导出。

## getSyncFnMapByApis
将所有的 api 对象拍平成一个 Map，与 `tua-storage` 配合使用可以将各个发起 `api` 的函数的 `key` 与其自身绑定。

## getPreFetchFnKeysBySyncFnMap
过滤出有默认参数的接口（接口参数非数组，且不含有 isRequired）。

适用于 node 端发起请求预取数据的场景。
