var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('default', ['test']);

gulp.task('test', function () {
  return gulp.src('./test/unit/**/*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('test-integration', function(){
  return gulp.src('./test/integration/**/*.js', { read: false })
    .pipe(mocha({reporter: 'nyan' }));
});
