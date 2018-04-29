const
    path = require('path'),
    gulp = require('gulp'),
    sequence = require('gulp-sequence'),
    notifier = require('node-notifier'),
    clean = require('../common/clean'),
    tsc = require('../common/tsc'),
    watch = require('../common/watch'),
    tsconfig = require('../../tsconfig.json').compilerOptions,
    PATH = require('../config');

let icon_tsc = path.join(__dirname, '../assets/tsc.png'),
    notification = {
        title: 'Typescript Compiler',
        message: 'Compilation Finished.',
        icon: icon_tsc,
        wait: true
    },
    watchTasks = ['tsc-watch-ts'];

// 子任务
gulp.task('tsc-clean', clean(PATH.tsc.dest));
gulp.task('tsc-compile', tsc(PATH.tsc.src, 'out'));
gulp.task('tsc-notify', () => notifier.notify(notification));

gulp.task('tsc-watch-ts', ['tsc'], watch({ src: PATH.tsc.src, outExtension: '.js' }, ['tsc']));
if(tsconfig.sourceMap) {
    gulp.task('tsc-watch-map', watch({ src: PATH.tsc.src, outExtension: '.js.map' }));
    watchTasks.push('tsc-watch-map');
}

// 主任务
gulp.task('tsc', () => sequence('tsc-compile', 'tsc-notify')(err => err && console.error(err)));
gulp.task('tsc-watch', watchTasks);
