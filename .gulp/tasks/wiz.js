const
    gulp = require('gulp'),
    copy = require('../common/copy'),
    print = require('../common/print-log'),
    zip = require('../common/zip'),
    { name, version } = require('../../package.json'),
    sequence = require('gulp-sequence'),
    watch = require('../common/watch');

require('./tsc');
require('./webpack');

const
    root = 'D:\\ProgramFiles\\WizNote 4.10.5\\My Knowledge',
    logs = [`${root}/Wiz.log`, `${root}/WizChromeBrowser.log`],
    logEncodings = ['utf-16le', 'gbk'];

// 子任务
gulp.task('wiz-copy', copy('src/*.{ini,json}', 'out'));

// 主任务
gulp.task('wiz-build', () => sequence(['webpack', 'tsc-compile', 'wiz-copy'], 'tsc-notify')(err => err && console.log(err.message)));
gulp.task('wiz-build-dev', () => sequence(['webpack', 'tsc-compile', 'wiz-copy'], 'tsc-notify')(err => err && console.log(err.message)));
gulp.task('wiz-build-dev-watch', ['wiz-build-dev'], watch({ src: 'src/**/*' }, ['wiz-build-dev']));
gulp.task('wiz-log', print(logs, logEncodings));
gulp.task('wiz-pack', zip('out/src/**/*', 'out', `${name}-${version}.wizplugin`));
