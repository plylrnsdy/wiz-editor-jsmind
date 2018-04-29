const
    gulp = require('gulp'),
    zip = require('gulp-zip'),
    { name, version } = require('../../package.json');


module.exports = (src, dest, archiveName) => {
    return () => {
        return gulp.src(src)
            .pipe(zip(archiveName || `${name}-${version}.zip`))
            .pipe(gulp.dest(dest));
    }
}
