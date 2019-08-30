const { task, src, dest, series, watch } = require('gulp');

const _sass = require('gulp-sass');
const _autoprefixer = require('gulp-autoprefixer');
const _cleanCSS = require('gulp-clean-css');
//const _browserSync = require('browser-sync').create();
//const _babel = require('gulp-babel');
//const _uglify = require('gulp-uglify');
//const _pipeline = require('readable-stream').pipeline;
//const _eslint = require("gulp-eslint");
const _through2 = require('through2').obj;
const File = require('vinyl');

//// SERVER ////

//function server() {
//    return _browserSync.init({
//        server: {
//            baseDir: "./"
//        },
//        //open: false,
//        port: 8080
//    });
//};

/// STYLES ///

function sass() {
    return src('scss/**/*.scss')
        .pipe(_sass())
        .pipe(_autoprefixer())
        .pipe(dest('styles/'))
        .pipe(_cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('build/styles/'))
}

function sass_watch() {
    return watch('scss/**/*.scss', series(sass) )
}

/// JS ///

function processJs() {
    return src('js/**/*.js')
        .pipe(_babel({
            presets: ['@babel/env']
        }))
        .pipe(dest('build/js'))
}

function uglifyJs() {
    return _pipeline(
        src('build/js/*.js'),
        _uglify(),
        dest('build/js')
    );
}

task('compress', series(processJs, uglifyJs));

/// EXPORT ///

//exports.default = server;
exports.sass = sass;
exports.sass_watch = sass_watch;