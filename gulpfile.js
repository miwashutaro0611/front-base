const gulp = require("gulp")
const pug = require('gulp-pug')
const plumber = require('gulp-plumber')
const notify = require("gulp-notify")
const browserSync = require('browser-sync')
const webpackStream = require("webpack-stream")
const webpack = require("webpack")

const webpackConfig = require("./webpack.config")

const src = {
  'html': ['src/pages/*.pug', '!' + 'src/**/_*.pug'],
  'stylus': 'src/**/*.styl',
  'js': 'src/**/*.js',
  'json': 'src/posts/',
  'image': 'src/assets/img/**/*',
  'fonts': 'src/assets/fonts/**/*'
}

const dest = {
  'root': 'dist/',
  'html': 'dist/'
}

gulp.task("js", () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest(dest.root))
})

gulp.task('html', () => {
  return gulp.src(src.html)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    // .pipe(data( (file) => {
    //   return {
    //     'peopleData': require('./src/_data/people.json'),
    //     'relativePath': file.history[0].replace(file.base, '')
    //   }
    // }))
    .pipe(pug({
      basedir: 'src/pages',
      pretty: true
    }))
    .pipe(gulp.dest(dest.root))
    .pipe(browserSync.reload({stream: true}))
});

const browsers = [
  'last 2 versions', // メジャーブラウザの最新の2バージョンに対応
  '> 5%', //シェア5%以上のブラウザに対応
  'ie = 11',
  'not ie <= 10', //バージョン10以前のIEを対象から外す。
  'ios >= 8', //iOS8以上
  'and_chr >= 5', // Chrome for Android 5以上
  'Android >= 5' //Android Browserは5以上
];

// gulp.task('watch',['html', 'stylus', 'js', 'image', 'fonts', 'browser-sync'], () => {
gulp.task('watch',['html', 'js'], () => {
  gulp.watch(src.html[0], ['html'])
  // gulp.watch(src.css, ['css'])
  gulp.watch(src.js, ['js'])
  // gulp.watch(src.stylus, ['stylus'])
  // gulp.watch(src.image, ['image'])
  // gulp.watch(src.fonts, ['fonts'])
});

gulp.task('default', ['watch']);
gulp.task('build', ['html', 'js'])
// gulp.task('build', ['html', 'stylus', 'js', 'image', 'fonts'])