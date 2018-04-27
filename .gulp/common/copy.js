const
    gulp = require('gulp'),
    changed = require('gulp-changed'),
    copyTo = require('gulp-copy')

/**
 * 复制文件
 *
 * @param {string} src 源目录
 * @param {string} dest 目标目录
 * @param {number} removedPrefix 去掉源目录的前缀目录个数
 * @returns gulp 处理函数
 */
module.exports = (src, dest, removedPrefix) => {
    return () => {
        return gulp.src(src)
            .pipe(changed(dest))
            .pipe(copyTo(dest, { prefix: removedPrefix }))
    }
}
