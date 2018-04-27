const
    gulp = require('gulp'),
    copy = require('../common/copy'),
    clean = require('../common/clean'),
    print = require('../common/print-log'),
    sequence = require('gulp-sequence'),
    watch = require('../common/watch');

require('./tsc');
require('./webpack');

const
    root = 'D:\\ProgramFiles\\WizNote 4.10.5\\My Knowledge',
    logs = [`${root}/Wiz.log`, `${root}/WizChromeBrowser.log`],
    logEncodings = ['utf-16le', 'gbk'];

// 子任务
gulp.task('wiz-log', print(logs, logEncodings));

// 主任务
gulp.task('wiz-build', () => sequence(['webpack', 'tsc-compile'], 'tsc-notify')(err => err && console.log(err.message)));
gulp.task('wiz-build-watch', ['wiz-build'], watch({ src: 'src/**/*' }, ['wiz-build']));
