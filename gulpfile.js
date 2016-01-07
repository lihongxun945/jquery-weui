var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require("gulp-connect");
var less = require("gulp-less");

gulp.task('js', function() {
  return gulp.src(['./src/js/modal.js'])
    .pipe(concat({ path: 'weui-jquery.js'}))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('less', function () {
  return gulp.src(['./src/less/jquery-weui.less'])
  .pipe(less())
  .pipe(gulp.dest('./dist/css/'));
});

gulp.task('copy', function() {
  return gulp.src(['./src/lib/**/*'])
    .pipe(gulp.dest('./dist/lib/'));
});

gulp.task('watch', function () {
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/less/**/*.less', ['less']);
});

gulp.task('server', function () {
  connect.server();
});
gulp.task("default", ['js', 'less', 'copy']);
