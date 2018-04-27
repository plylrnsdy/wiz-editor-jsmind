const
    gulp = require('gulp'),
    changed = require('gulp-changed'),
    tsc = require('gulp-typescript'),
    tsconfig = require('../../tsconfig.json').compilerOptions;

module.exports = (src = '{src,test}/**/*.ts', dist = 'out', ext = '.js') => {

    if(!tsconfig.sourceMap) {
        return () => {
            return gulp.src(src)
                .pipe(changed(dist, { extension: ext }))
                .pipe(tsc(tsconfig))
                .pipe(gulp.dest(dist));
        }
    }
    else {
        const sourcemaps = require('gulp-sourcemaps');
        return () => {
            return gulp.src(src)
                .pipe(changed(dist, { extension: ext }))
                .pipe(sourcemaps.init())
                .pipe(tsc(tsconfig))
                // source paths are prefixed with '../../' to ensure the relative path correctly
                .pipe(sourcemaps.mapSources((sourcePath, file) => { return '../../' + sourcePath; }))
                // *.map file created in the folder '.' relative to *.js
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(dist));
        }
    }
}
