const gulp = require('gulp')
const clean = require('../common/clean')
const webpack = require('../common/webpack')

const PATH = require('../config')
const WEBPACK_CONFIG = require('@vue/cli-service/webpack.config')


exports['webpack-build'] = webpack(WEBPACK_CONFIG)

exports['webpack'] = webpack(WEBPACK_CONFIG)

exports['webpack-watch'] = gulp.series(
  clean(PATH.webpack.dest),
  webpack(WEBPACK_CONFIG, true)
)
