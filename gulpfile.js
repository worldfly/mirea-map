'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');

gulp.task('css', function() {
    gulp.src(['app/app.styl'])
        .pipe(stylus())
        .pipe(gulp.dest('public/app'));
});

gulp.task('default', ['css']);
