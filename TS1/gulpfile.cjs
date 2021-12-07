const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const ts = require("gulp-typescript");
const uglify = require('gulp-uglify');
const { src, dest } = require('gulp');
const tsProject = ts.createProject("tsconfig.json");

gulp.task('javascript', function () {
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(uglify('index.js')).pipe(dest("src"));

});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/index.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('javascript', 'browser-sync'))