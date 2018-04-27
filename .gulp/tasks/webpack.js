const gulp = require('gulp'),
    clean = require('../common/clean'),
    webpack = require('../common/webpack'),
    PATH = require('../config');

// 主任务
gulp.task('webpack', webpack())
gulp.task('webpack-watch', ['webpack-clean'], webpack(true))

// 子任务
gulp.task('webpack-clean', clean(PATH.webpack.dest));
