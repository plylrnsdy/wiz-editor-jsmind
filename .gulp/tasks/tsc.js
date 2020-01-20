const path = require('path')
const gulp = require('gulp')
const notifier = require('node-notifier')
const clean = require('../common/clean')
const tsc = require('../common/tsc')
const watch = require('../common/watch')

const tsconfig = require('../../tsconfig.json').compilerOptions
const PATH = require('../config')
const ICON_TS = path.join(__dirname, '../assets/tsc.png')
const notification = {
  title: 'Typescript Compiler',
  message: 'Compilation Finished.',
  icon: ICON_TS,
  wait: true
}


exports['tsc'] = gulp.series(
  tsc(PATH.tsc.src, 'out'),
  done => {
    notifier.notify(notification);
    done();
  }
)

exports['tsc-watch'] = gulp.parallel(
  ...[
    gulp.series(
      exports['tsc'],
      watch({ src: PATH.tsc.src, outExtension: '.js' }, exports['tsc'])
    ),
    watch({ src: PATH.tsc.src, outExtension: '.js.map' }),
    // 若启用 sourceMap 则监听 .map 文件
  ].slice(0, tsconfig.sourceMap ? 2 : 1)
)
