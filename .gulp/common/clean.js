const
    gulp = require('gulp'),
    del = require('del')

/**
 * 删除文件/目录
 *
 * @param {any} patterns 以 / 开头
 * @param {any} root patterns 的父目录
 * @returns
 */
module.exports = (patterns, root) => {
    return () => {
        return del(patterns, {
            root: root,
            force: true
        })
    }
}
