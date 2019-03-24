const gulp  = require('gulp');
const sass  = require('gulp-sass');
const media = require('gulp-group-css-media-queries');

gulp.task('sass', function() {
    return gulp.src('scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('styles/'))
});

gulp.task('sass:watch', function(){
    gulp.watch('scss/**/*.scss', gulp.series('sass'));
});

gulp.task('default', function () {
    gulp.src('styles/styles.css')
        .pipe( media() )
        .pipe(gulp.dest('styles'));
});


