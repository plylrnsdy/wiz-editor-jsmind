const gulp = require('gulp'),
    test = require('../common/test');

gulp.task('test', test('out/test/**/*.spec.js'));
