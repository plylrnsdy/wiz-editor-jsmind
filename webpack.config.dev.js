var config = require('./webpack.config'),
    path = require('path'),
    WebpackDevServer = require('webpack-dev-server');


module.exports = Object.assign(config, {
    mode: 'development',
    stats: { // 控制输出哪些统计信息
        cached: false, // 缓存了的（但没构建）模块的信息
        cachedAssets: false, // 缓存了的资源
        children: false, // 子级的信息
        chunks: false, // 包信息（设置为 `false` 能允许较少的冗长输出）
        chunkModules: false, // 将内置模块信息增加到包信息
        colors: true, // 使用颜色
        errorDetails: false, // 错误的详细信息（就像解析日志一样）
        hash: false, // 编译的哈希值
        modules: false, // 内置的模块信息
        reasons: false, // 模块被引入的原因
        source: false, // 模块的源码
        timings: true, // 每个文件生成时间
        version: false, // webpack 版本信息
        warnings: true, // 显示警告信息
    },
    watchOptions: {
        poll: 1000, // 检查文件是否更改的时间间隔(ms)
        aggregateTimeout: 750, // 允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里(ms)
        ignored: /node_modules/ // 排除一些无关的文件夹
    },
    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, '../out/src/editor'),
        historyApiFallback: true,
        hot: true
    }
});
