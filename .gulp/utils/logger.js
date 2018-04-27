const
    PluginError = require('plugin-error'),
    logger = require('fancy-log'),
    notifier = require('node-notifier'),
    path = require('path'),
    util = require('util');

let icon_webpack = path.join(__dirname, '../assets/webpack.png'),
    seperator = '-'.repeat(85);

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
            icon: icon_webpack,
            wait: true
        });
    } else {
        // 正常时输出
        console.log(`           ${seperator}   `);
        logger.info(stats.toString(require('../../webpack.config').stats));
        notifier.notify({
            title: 'Webpack',
            message: `Time Usage: ${stats.endTime - stats.startTime} ms`,
            icon: icon_webpack,
            wait: true
        });
    }
}
