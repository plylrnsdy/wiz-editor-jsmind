var config = require('./webpack.config'),
  path = require('path'),
  WebpackDevServer = require('webpack-dev-server');


module.exports = Object.assign(config, {
  mode: 'development',
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
