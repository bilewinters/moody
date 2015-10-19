var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var gulp       = require('gulp');
var utils      = require('gulp-util');
var uglify     = require('gulp-uglify');
var concatCss  = require('gulp-concat-css');
var minifyCss  = require('gulp-minify-css');
var less       = require('gulp-less');

var debugMode = utils.env.production === undefined;

function swallowStreamingErrors (error) {

    utils.log(error.toString());
    this.emit('end');

}

gulp.task('compile-javascript', function () {

    return browserify({
            entries: ['./src/javascript/app.jsx'],
            debug:   debugMode
        })
        .transform(babelify.configure({
            modules: "common",
            sourceRoot: "./javascript"
        }))
        .bundle()
        .on('error', swallowStreamingErrors)
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(debugMode ? utils.noop() : uglify())
        .pipe(gulp.dest('./dist/javascript/'));

});

gulp.task('build-less', function(){

    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/compiled-css'));

});

gulp.task('compile-css', ['build-less'], function () {

    var concatCssOptions = {
        rebaseUrls: false
    };

    var minifyCssOptions = {
        keepSpecialComments: false,
        mediaMerging:        false,
        advanced:            false,
        rebase:              false
    };

    return gulp.src(['./src/css/**/*.css', './dist/compiled-css/app.css'])
        .pipe(concatCss('app.min.css', concatCssOptions))
        .on('error', swallowStreamingErrors)
        .pipe(buffer())
        .pipe(debugMode ? utils.noop() : minifyCss(minifyCssOptions))
        .on('error', swallowStreamingErrors)
        .pipe(gulp.dest('./dist/css/'));

});

gulp.task('copy-fonts', function () {

    return gulp.src(['./node_modules/bootstrap/dist/fonts/*.*'])
        .pipe(gulp.dest('./dist/fonts/'));

});

gulp.task('copy-images', function () {

    return gulp.src(['./src/images/**/*.*'])
        .pipe(gulp.dest('./dist/images/'));

});

gulp.task('copy-html', function () {

    return gulp.src(['./src/**/*.html'])
        .pipe(gulp.dest('./dist/'));

});

gulp.task('build', ['compile-javascript', 'build-less', 'compile-css', 'copy-fonts', 'copy-images', 'copy-html'], function () {

    var mode = debugMode
        ? utils.colors.red('debug')
        : utils.colors.green('production');

    utils.log("Mode     '" + mode + "'...");

});

gulp.task('watch', function () {

    gulp.watch(
        ['src/javascript/**'],
        ['compile-javascript']);

    gulp.watch(
        ['src/css/**'],
        ['compile-css']);

    gulp.watch(
        ['src/less/**'],
        ['compile-css']);

    gulp.watch(
        ['src/images/**'],
        ['copy-images']);

    gulp.watch(
        ['src/**/*.html'],
        ['copy-html']);

});
