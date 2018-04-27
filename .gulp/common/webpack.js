const
    gulp = require('gulp'),
    webpack = require('webpack'),
    logger = require('../utils/logger'),
    config = require('../../webpack.config');

module.exports = (isWatch = false) => {
    if (!isWatch)
        // 非监听模式
        return (callback) => {
            webpack(
                config,
                // callback 是为了让 gulp 异步任务不阻塞
                (err, stats) => callback()
            )
        };
    else
        //监听模式
        return (callback) => {
            webpack(
                Object.assign(config, { watch: isWatch }),
                // 该异步任务不需要结束，所以不需要 callback
                // 该任务不结束，所以增量更新由 webpack 自己完成
                (err, stats) => logger(err, stats)
            )
        };
};
