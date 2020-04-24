var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var rename = require('gulp-rename');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var sourceMaps = require('gulp-sourcemaps');
var LessFunc = require('less-plugin-functions');
var lessFunc = new LessFunc();


gulp.task('css', ['fonts'], function () {
  var plugins = [
    autoprefixer({
      browsers: ['last 20 versions', 'ie > 8']
    })
  ];
  gulp.src('./src/styles/style.less')
    .pipe(sourceMaps.init())
    .pipe(less({
      plugins: [lessFunc]
    }))
    .pipe(postcss(plugins))
    // .pipe(cleanCSS())
    .pipe(rename('vie-mobile.css'))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./static/css/'));

  gulp.src('./src/styles/style_px.less')
    .pipe(sourceMaps.init())
    .pipe(less({
      plugins: [lessFunc]
    }))
    .pipe(postcss(plugins))
    // .pipe(cleanCSS())
    .pipe(rename('vie-mobile-px.css'))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./static/css/'));
});
gulp.task('procss', ['fonts'], function () {
  var plugins = [
    autoprefixer({
      browsers: ['last 20 versions', 'ie > 8']
    })
  ];
  gulp.src('./src/styles/style_pro.less')
    .pipe(sourceMaps.init())
    .pipe(less({
      plugins: [lessFunc]
    }))
    .pipe(postcss(plugins))
    // .pipe(cleanCSS())
    .pipe(rename('vie-mobile.css'))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./static/css/'));
});
gulp.task('css-px', ['fonts'], function () {
  var plugins = [
    autoprefixer({
      browsers: ['last 20 versions', 'ie > 8']
    })
  ];
  return gulp.src('./src/styles/style_px.less')
    .pipe(sourceMaps.init())
    .pipe(less({
      plugins: [lessFunc]
    }))
    .pipe(postcss(plugins))
    // .pipe(cleanCSS())
    .pipe(rename('vie-mobile-px.css'))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./static/css/'));
});

// 拷贝字体文件
gulp.task('fonts', function () {
  return gulp.src('./src/styles/fonts/ionicicons/fonts/*.*')
    .pipe(gulp.dest('./static/fonts/'));
});

gulp.task('static', ['procss', 'fonts', 'pubcss', 'pubfont']);

gulp.task('pubcss', function () {
  return gulp.src('./static/css/*')
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('pubfont', function () {
  return gulp.src('./static/fonts/*')
    .pipe(gulp.dest('./dist/fonts'))
})

gulp.task('default', ['css']);


gulp.task('publish', ['static'])
