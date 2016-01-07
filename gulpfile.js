var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('js', function() {
  return gulp.src(['./src/js/modal.js'])
    .pipe(concat({ path: 'weui-jquery.js'}))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('copy', function() {
  return gulp.src(['./src/lib/**/*'])
    .pipe(gulp.dest('./dist/lib/'));
});

gulp.task('watch', function () {
  gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('server', function () {
  gulp.start('server');
});
gulp.task("default", ['js', 'copy']);
