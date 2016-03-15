'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const jshint = require('gulp-jshint');
const modernizr = require('modernizr');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');

gulp.task('css', () => {
    gulp.src(['app/app.styl'])
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/app'));
});

gulp.task('js-lint', () => {
    gulp.src(['app/js/*.js'/*, 'server.js'*/])
        .pipe(jshint({
            esversion: 6
        }))
        .pipe(jshint.reporter('default'));
});

gulp.task('js-browserify', ['js-lint'], () => {
    browserify({
        entries: 'app/js/bootstrap.js',
        extensions: ['.js']
    })
        .transform(babelify.configure({presets: ['es2015']}))
        .bundle()
        .pipe(source('app/js/bootstrap.js'))
        .pipe(gulp.dest('public'));
});

gulp.task('modernizr', () => {
    modernizr.build({
        minify: true,
        options: [],
        'feature-detects': [
            'test/dom/classlist',
            'test/svg/inline',
            'test/css/transforms'
        ]
    }, (result) => require('fs').writeFileSync('public/app/js/external/modernizr.js', result, {encoding: 'utf-8'}));
});

gulp.task('compress', ['js', 'css'], () => {
    gulp.src('public/app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/app/js'));

    gulp.src('public/app/app.css')
        .pipe(cssnano())
        .pipe(gulp.dest('public/app'));
});

gulp.task('js', ['js-browserify']);

gulp.task('default', ['css', 'js']);
gulp.task('all', ['default', 'compress', 'modernizr']);
