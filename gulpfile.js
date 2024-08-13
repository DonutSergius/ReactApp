const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

gulp.task('compile-scss', function() {
    return gulp.src('src/styles/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('src/styles/css'));
});

gulp.task('watch-scss', function() {
    gulp.watch('src/styles/scss/**/*.scss', gulp.series('compile-scss'));
});

gulp.task('default', gulp.series('compile-scss', 'watch-scss'));