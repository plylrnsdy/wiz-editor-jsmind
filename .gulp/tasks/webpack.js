const gulp = require('gulp'),
    clean = require('../common/clean'),
    webpack = require('../common/webpack'),
    PATH = require('../config');

// 主任务
gulp.task('webpack-build', webpack('../../webpack.config.prod'));
gulp.task('webpack', webpack('../../webpack.config.dev'));
gulp.task('webpack-watch', ['webpack-clean'], webpack('../../webpack.config.dev', true));

// 子任务
gulp.task('webpack-clean', clean(PATH.webpack.dest));
