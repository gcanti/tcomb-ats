var gulp = require('gulp');
var browserify = require('browserify');
var rename = require('gulp-rename');
var traceur = require('gulp-traceur');
var source = require('vinyl-source-stream');

var options = {
  "modules": "commonjs",
  "script": false,
  "types": true,
  "typeAssertions": true,
  "typeAssertionModule": "../.",
  "annotations": true,
  "memberVariables": true
};

var PATH = {
  SRC: './index.js',
  LIB: './demo',
  ATS: ['./demo/**/*.ats']
};

// transpile AtScript files
gulp.task('transpile', function() {
  gulp.src(PATH.ATS)
      .pipe(traceur(options))
      .pipe(rename({extname: '.js'}))
      .pipe(gulp.dest(PATH.LIB));
});

// watch files for changes
gulp.task('watch', function() {
  gulp.watch(PATH.ATS, ['transpile', 'demo']);
  gulp.watch(PATH.SRC, ['default']);
});

gulp.task('demo', function () {
  browserify('./demo/demo.js')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./demo'));
});

gulp.task('default', ['transpile', 'demo', 'watch']);
