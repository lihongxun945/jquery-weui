var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require("gulp-connect");
var less = require("gulp-less");
var autoprefixer = require('gulp-autoprefixer');

gulp.task('js', function() {
  return gulp.src([
    './src/js/jquery-extend.js',
    './src/js/modal.js',
    './src/js/toast.js',
    './src/js/action.js',
    './src/js/pull-to-refresh.js',
    './src/js/infinite.js',
    './src/js/tab.js',
    './src/js/search-bar.js'
  ])
    .pipe(concat({ path: 'jquery-weui.js'}))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('less', function () {
  return gulp.src(['./src/less/jquery-weui.less'])
  .pipe(less())
  .pipe(autoprefixer())
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
