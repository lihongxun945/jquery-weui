var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require("gulp-clean");

gulp.task('js', function() {
  return gulp.src(['./src/js/action-sheet.js'])
    .pipe(concat({ path: 'weui-jquery.js'}))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('copy', function() {
  return gulp.src(['./src/lib/**/*'])
    .pipe(gulp.dest('./dist/lib/'));
});

gulp.task('clean', function () {
  return gulp.src('./dist', {read: false})
  .pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('server', function () {
  gulp.start('server');
});
gulp.task("default", ['clean', 'js', 'copy']);
