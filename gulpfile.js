const { task, src, dest, series, watch } = require('gulp');

const _sass = require('gulp-sass');
const _autoprefixer = require('gulp-autoprefixer');
const _cleanCSS = require('gulp-clean-css');
const _browserSync = require('browser-sync').create();
const _babel = require('gulp-babel');
const _uglify = require('gulp-uglify');
const _pipeline = require('readable-stream').pipeline;
const _eslint = require("gulp-eslint");
const _through2 = require('through2').obj;
const File = require('vinyl');

//// SERVER ////

function server() {
    return _browserSync.init({
        server: {
            baseDir: "./"
        },
        //open: false,
        port: 8080
    });
};

/// STYLES ///

function sass() {
    return src('scss/**/*.scss')
        .pipe(_sass())
        .pipe(_autoprefixer())
        .pipe(dest('styles/'))
        .pipe(_cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('build/styles/'))
}

task('sass_watch', function () {
    watch('scss/**/*.scss', series(style));
});

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

/// ESLINT ///

function eslint() {

    let cache = {};

    let cacheDirectory = process.cwd() + "/eslintCache.json"

    return src("js/**/*.js")
        .pipe(_eslint({
            rules: {
                'strict': 2
            },
            globals: [
                'WTR'
            ],
            envs: [
                'browser',
                'es6'
            ],
            parserOptions: {
                "sourceType": "module"
            }
        }))
        .pipe(_through2(function (file, encode, callback) {

            let key = file.relative;

            if (!cache.key) {

                cache[key] = {
                    eslint: file.eslint,
                    mtime: file.stat.mtime
                }

            }

            for (let key in cache) {
                if (cache[key].eslint.messages.length) {
                    console.log(cache[key].eslint.messages)
                }
            }

            callback()
        },
            function (callback) {

                let cacheFile = new File({
                    base: process.cwd(),
                    path: cacheDirectory,
                    contents: new Buffer( JSON.stringify(cache) )
                })

                cache.isCache = true;

                this.push(cacheFile)

                callback()
            }
        )
        )
        .pipe(_eslint.format())
        .pipe(dest(function (file) {
            if (file.isCache) {
                return process.cwd();
            }
            else {
                return "build";
            }
        })).on("end", () => {
            console.log('There will be no more data.');
        })

}

/// EXPORT ///

exports.default = server;
exports.sass = sass;
exports.eslint = eslint;