const PluginError = require('plugin-error')
const logger = require('fancy-log')
const notifier = require('node-notifier')
const path = require('path')

const ICON_WEBPACK = path.join(__dirname, '../assets/webpack.png')
const seperator = '-'.repeat(85);


// 美化 webpack 的日志输出
module.exports = function (err, stats) {
  // 抛出 webpack 自己的错误
  if (err) throw new PluginError('webpack', err);

  // webpack 处理文件的输出
  if (stats.compilation.errors.length > 0) {
    // 出错时输出
    stats.compilation.errors.forEach((error) => {
      logger.info(`${seperator}   `);
      console.log(error.message);
      // 阻止 gulp 进程中止
      if (typeof this.emit === 'function')
        this.emit('end');
    });
    notifier.notify({
      title: '[Error] Webpack',
      message: `Error Count :  ${stats.compilation.errors.length}`,
      icon: ICON_WEBPACK,
      wait: true
    });
  } else {
    // 正常时输出
    console.log(`           ${seperator}   `);
    logger.info(
      // 控制输出哪些统计信息
      stats.toString({
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
      }));
    notifier.notify({
      title: 'Webpack',
      message: `Time Usage: ${stats.endTime - stats.startTime} ms`,
      icon: ICON_WEBPACK,
      wait: true
    });
  }
}
