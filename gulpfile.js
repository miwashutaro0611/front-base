const gulp = require("gulp")
const pug = require('gulp-pug')
const stylus = require('gulp-stylus')
const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')
const plumber = require('gulp-plumber')
const notify = require("gulp-notify")
const sourcemaps = require('gulp-sourcemaps')
const minifyCss  = require('gulp-minify-css')
const browserSync = require('browser-sync')
const webpackStream = require("webpack-stream")
const webpack = require("webpack")

const webpackConfig = require("./webpack.config")

const src = {
  'html': [
    'src/pages/*.pug',
    '!' + 'src/layouts/*.pug',
    '!' + 'src/components/**/**/*.pug'
  ],
  'stylus': 'src/assets/stylus/*.styl',
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
      basedir: 'src',
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

// cssファイルをdestディレクトリに出力（コピー）します。
gulp.task('css', function() {
  return gulp.src(src.css, {base: src.root})
    .pipe(gulp.dest(dest.root))
    .pipe(browserSync.reload({stream: true}))
});

// gulp stylus で実行するタスク
gulp.task('stylus', function () {
  gulp.src(src.stylus)
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError("エラーです。")}))
    // .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(stylus())
    .pipe(postcss([cssnext(browsers)]))
    .pipe(minifyCss({advanced:false}))
    .pipe(sourcemaps.write('../maps/'))
    .pipe(gulp.dest(dest.root + 'assets/css/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'dist/',
      index: "/index.html"
    }
  });
});

// gulp.task('watch',['html', 'stylus', 'js', 'image', 'fonts', 'browser-sync'], () => {
gulp.task('watch',['html', 'stylus', 'js', 'browser-sync'], () => {
  gulp.watch(src.html[0], ['html'])
  gulp.watch(src.css, ['css'])
  gulp.watch(src.js, ['js'])
  gulp.watch(src.stylus, ['stylus'])
  // gulp.watch(src.image, ['image'])
  // gulp.watch(src.fonts, ['fonts'])
});

gulp.task('default', ['watch']);
gulp.task('build', ['html', 'stylus', 'js'])
// gulp.task('build', ['html', 'stylus', 'js', 'image', 'fonts'])