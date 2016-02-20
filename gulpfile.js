'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const jshint = require('gulp-jshint');

gulp.task('css', () => {
    gulp.src(['app/app.styl'])
        .pipe(stylus())
        .pipe(gulp.dest('public/app'));
});

gulp.task('jshint', () => {
    gulp.src('app/js/*.js')
        .pipe(jshint({
            esversion: 6
        }))
        .pipe(jshint.reporter('default'));
});

gulp.task('js', ['jshint'], () => {
    browserify({
        entries: 'app/js/bootstrap.js',
        extensions: ['.js']
    })
        .transform(babelify.configure({presets: ['es2015']}))
        .bundle()
        .pipe(source('app/js/bootstrap.js'))
        .pipe(gulp.dest('public'));
});

gulp.task('default', ['css', 'js']);
