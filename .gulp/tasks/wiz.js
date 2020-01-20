const path = require('path')
const gulp = require('gulp')
const copy = require('../common/copy')
const print = require('../common/print-log')
const zip = require('../common/zip')
const { name, version } = require('../../package.json')
const watch = require('../common/watch')
const notifier = require('node-notifier')
const tsc = require('./tsc');
const webpack = require('./webpack');

const ROOT = 'D:\\ProgramFiles\\WizNote 4.10.5\\My Knowledge'
const LOG_FILES = [`${ROOT}/Wiz.log`, `${ROOT}/WizChromeBrowser.log`]
const LOG_ENCODINGS = ['utf-16le', 'gbk']
const ICON_WIZ = path.join(__dirname, '../assets/wiz.png')
const notification = {
  title: 'Wiz Plugin',
  message: 'Plugin Builded.',
  icon: ICON_WIZ,
  wait: true
}


const wiz = {
  notify: done => {
    notifier.notify(notification);
    done();
  },
  copy: copy('src/*.{ini,json}', 'out'),
}

exports['wiz-build'] = gulp.series(
  gulp.parallel(
    webpack['webpack-build'],
    tsc['tsc'],
    wiz['copy']
  ),
  wiz['notify']
)

exports['wiz-build-dev'] = gulp.series(
  gulp.parallel(
    webpack['webpack'],
    tsc['tsc'],
    wiz['copy']
  ),
  wiz['notify']
)

exports['wiz-build-dev-watch'] = gulp.series(
  exports['wiz-build-dev'],
  watch({ src: 'src/**/*' }, exports['wiz-build-dev'])
)

exports['wiz-log'] = print(LOG_FILES, LOG_ENCODINGS)

exports['wiz-pack'] = zip('out/src/**/*', 'out', `${name}-${version}.wizplugin`)
