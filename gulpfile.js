var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require("gulp-connect");
var less = require("gulp-less");
var autoprefixer = require('gulp-autoprefixer');
var ejs = require("gulp-ejs");

gulp.task('js', function() {
  gulp.src([
    './src/js/city-data.js',
    './src/js/city-picker.js'
  ])
    .pipe(concat({ path: 'city-picker.js'}))
    .pipe(gulp.dest('./dist/js/'));

  gulp.src([
    './src/js/swiper.jquery.js',
    './src/js/swiper-wrap.js'
  ])
    .pipe(concat({ path: 'swiper.js'}))
    .pipe(gulp.dest('./dist/js/'));

  gulp.src([
    './src/js/jquery-extend.js',
    './src/js/modal.js',
    './src/js/toast.js',
    './src/js/action.js',
    './src/js/pull-to-refresh.js',
    './src/js/infinite.js',
    './src/js/tab.js',
    './src/js/search-bar.js',
    './src/js/device.js',
    './src/js/picker.js',
    './src/js/calendar.js',
    './src/js/datetime-picker.js'
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

gulp.task('ejs', function () {
  return gulp.src(["./demos/*.html", "!./demos/_*.html"])
    .pipe(ejs({}))
    .pipe(gulp.dest("./dist/demos/"));
});

gulp.task('copy', function() {
  gulp.src(['./src/lib/**/*'])
    .pipe(gulp.dest('./dist/lib/'));

  gulp.src(['./demos/images/*.*'])
    .pipe(gulp.dest('./dist/demos/images/'));

  gulp.src(['./demos/css/*.css'])
    .pipe(gulp.dest('./dist/demos/css/'));
});

gulp.task('watch', function () {
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('demos/*.html', ['ejs']);
  gulp.watch('demos/css/*.css', ['copy']);
});

gulp.task('server', function () {
  connect.server();
});
gulp.task("default", ['js', 'less', 'copy', 'ejs']);
