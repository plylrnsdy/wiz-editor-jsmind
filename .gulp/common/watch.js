const
    gulp = require('gulp'),
    fs = require('fs'),
    path = require('path')

module.exports = ({ src, outExtension }, tasks) => {
    return () => {
        return gulp.watch(src, tasks)
            .on('change', (event) => {
                if(event.type === 'deleted') {
                    let outFile = path.relative('./', event.path)

                    if (outExtension) outFile = outFile.replace(/\.[^.]+$/, outExtension)
                    outFile = path.join(__dirname, '../../out', outFile)

                    // 计算变化的 源文件 到 输出目录 的路径
                    // outFile = path.join(__dirname, '../../out', path.relative('./', e.path).replace(/\.[^.]+$/, outExtension))
                    fs.existsSync(outFile) && fs.unlinkSync(outFile)
                }
            })
    }
}