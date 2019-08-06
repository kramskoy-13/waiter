const { task, src, dest, series, watch }  = require('gulp');
const sass  = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
//const media = require('gulp-group-css-media-queries');

task('sass', function() {
    return src('scss/**/*.scss')
    .pipe( sass() )
    .pipe(dest('styles/'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('build/styles/'))
});

////RUN A SERVER ////
function run() {
    series(server)()
}
//task('run', function () {
//    return series( serve )()
//})

function test() {
    return src('js/view/*.js', { buffer: false })
        .on("data", function (file) {
            console.log("before", {
                contents: file.contents,
                path: file.path,
                cwd: file.cwd,
                base: file.base,
                relative: file.relative,
                dirname: file.dirname
            })
        })
        .pipe(src('js/model/*.js', { buffer: false }))
        .on("data", function (file) {
            console.log("after", {
                contents: file.contents,
                path: file.path,
                cwd: file.cwd,
                base: file.base,
                relative: file.relative,
                dirname: file.dirname
            })
        })
        .pipe(dest('someDirToDelete/'))
}

function server() {
    return browserSync.init({
        server: {
            baseDir: "./"
        },
        //open: false,
        port: 8080
    });
};

function processJs() {
    return src('js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest('build/js'))
}

function uglifyJs() {
    return pipeline(
        src('build/js/*.js'),
        uglify(),
        dest('build/js')
    );
}

task('compress', series(processJs, uglifyJs));

task('minify-css', () => {
    return src('styles/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('build/styles'));
});

task('sass_watch', function(){
    watch('scss/**/*.scss', series('sass'));
});

//gulp.task('default', function () {
//    gulp.src('styles/styles.css')
//        .pipe( media() )
//        .pipe(gulp.dest('styles'));
//});

exports.default = run;
exports.test = test;