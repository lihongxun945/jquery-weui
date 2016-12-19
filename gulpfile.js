var yargs = require('yargs').argv;
var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var connect = require("gulp-connect");
var less = require("gulp-less");
var autoprefixer = require('gulp-autoprefixer');
var ejs = require("gulp-ejs");
var uglify = require('gulp-uglify');
var ext_replace = require('gulp-ext-replace');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

var pkg = require("./package.json");

var banner = 
"/** \n\
* jQuery WeUI V" + pkg.version + " \n\
* By 言川\n\
* http://lihongxun945.github.io/jquery-weui/\n \
*/\n";

gulp.task('js', function(cb) {

  count = 0;
  var end = function(){
    count ++;
    if(count >= 3) cb();
  };

  gulp.src([
    './src/js/city-data.js',
    './src/js/city-picker.js'
  ])
    .pipe(concat({ path: 'city-picker.js'}))
    .pipe(gulp.dest('./ybzy/js/'))
    .on("end", end);

  gulp.src([
    './www/lib/raty/lib/jquery.raty.js'
  ])
    .pipe(concat({ path: 'raty.js'}))
    .pipe(gulp.dest('./ybzy/js/'))
    .on("end", end);

  gulp.src([
    './src/js/swiper.jquery.js',
    './src/js/swiper-wrap.js',
    './src/js/photos.js'
  ])
    .pipe(concat({ path: 'swiper.js'}))
    .pipe(gulp.dest('./ybzy/js/'))
    .on("end", end);

  gulp.src([
    './src/js/jquery-extend.js',
    './src/js/template7.js',
    './src/js/hammer.js',
    './src/js/modal.js',
    './src/js/toast.js',
    './src/js/action.js',
    './src/js/pull-to-refresh.js',
    './src/js/infinite.js',
    './src/js/tab.js',
    './src/js/search-bar.js',
    './src/js/device.js',
    './src/js/picker.js',
    './src/js/select.js',
    './src/js/calendar.js',
    './src/js/datetime-picker.js',
    './src/js/popup.js',
    './src/js/notification.js',
    './src/js/toptip.js'
  ])
    .pipe(concat({ path: 'jquery-weui.js'}))
    .pipe(header(banner))
    .pipe(gulp.dest('./ybzy/js/'))
    .on("end", end);

});

gulp.task('uglify', ["js"], function() {
  return gulp.src(['./ybzy/js/*.js', '!./ybzy/js/*.min.js'])
    .pipe(uglify({
      preserveComments: "license"
    }))
    .pipe(ext_replace('.min.js'))
    .pipe(gulp.dest('./ybzy/js'));
});

gulp.task('less', function () {
  return gulp.src(['./src/less/jquery-weui.less'])
  .pipe(sourcemaps.init())
  .pipe(less().on('error', function (e) {
      console.error(e.message);
      this.emit('end');
  }))
  .pipe(autoprefixer())
  .pipe(header(banner))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./ybzy/css/'));
});

gulp.task('demosless', function () {
  return gulp.src(['./demos/css/*.less'])
  .pipe(sourcemaps.init())
  .pipe(less().on('error', function (e) {
      console.error(e.message);
      this.emit('end');
  }))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./ybzy/demos/css/'));
});

gulp.task('cssmin', ["less"], function () {
  gulp.src(['./ybzy/css/*.css', '!./ybzy/css/*.min.css'])
    .pipe(cssmin())
    .pipe(header(banner))
    .pipe(ext_replace('.min.css'))
    .pipe(gulp.dest('./ybzy/css/'));
});

gulp.task('ejs', function () {
  return gulp.src(["./demos/*.html", "!./demos/_*.html"])
    .pipe(ejs({}))
    .pipe(gulp.dest("./ybzy/demos/"));
});

gulp.task('demosimg', function() {
  gulp.src(['./demos/images/*.*'])
    .pipe(gulp.dest('./ybzy/demos/images/'));
});

gulp.task('copy', function() {
  gulp.src(['./src/lib/**/*'])
    .pipe(gulp.dest('./ybzy/lib/'));

  gulp.src(['./demos/css/*.css'])
    .pipe(gulp.dest('./ybzy/demos/css/'));
});

gulp.task('watch', function () {
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('demos/*.html', ['ejs']);
  gulp.watch('demos/css/*.less', ['demosless']);
  gulp.watch('demos/images/*.*', ['demosimg']);
  gulp.watch('demos/css/*.css', ['copy']);
});

gulp.task('server', function () {
    yargs.p = yargs.p || 8080;
    browserSync.init({
        server: {
            baseDir: "./ybzy",
            directory: true
        },
        ui: {
            port: yargs.p + 1,
            weinre: {
                port: yargs.p + 2
            }
        },
        port: yargs.p,
        startPath: '/demos'
    });
});
gulp.task("default", ['uglify', 'cssmin', 'demosimg', 'copy', 'ejs', 'watch', 'server']);
