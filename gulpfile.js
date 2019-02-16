const gulp = require("gulp") //gulpを使うためのもの
const pug = require('gulp-pug') //pugを使うためのもの
const data = require('gulp-data')
const stylus = require('gulp-stylus') //stylusを使うためのもの
const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')
const plumber = require('gulp-plumber')
const notify = require("gulp-notify")
const sourcemaps = require('gulp-sourcemaps') //cssのsourcemapの生成
const minifyCss  = require('gulp-minify-css')
const browserSync = require('browser-sync') //自動読み込みのためのもの
const webpackStream = require("webpack-stream") //gulpとwebpackを接続するためのもの
const webpack = require("webpack") //webpack
const htmlmin = require('gulp-htmlmin') //htmlの圧縮のために使うもの
const mode = require('gulp-mode')({ // gulp上で本番環境と開発環境を切り分けるためのもの
  modes: ["production", "development"],
  default: "development",
  verbose: false
})
const filter = require('gulp-filter')
const rev = require('gulp-rev')
const revRewrite = require('gulp-rev-rewrite')
const isProduction = mode.production() //本番環境かどうかを知るために記載(本番環境ならtrue)

const webpackConfigDev = require("./webpack.dev") // 開発環境のときに実行するwebpackのファイル
const webpackConfigProd = require("./webpack.prod") // 本番環境のときに実行するwebpackのファイル
const webpackConfig = isProduction ? webpackConfigProd : webpackConfigDev //本番か開発かどちらかを判断するためのもの


const src = { //
  'html': [ //
    'src/pages/**/*.pug', //pagesの中にあるディレクトリのものを読み込む
    '!' + 'src/**/_*.pug', // layouts,mixinなどの_(アンダーバー)が最初についているものについては除外
  ],
  'stylus': 'src/assets/stylus/*.styl', //stylus直下に入っているstylファイルのみコンンパイルを行う
  'js': 'src/**/*.js', // jsのファイルのコンパイルを行う
  'json': 'src/posts/', // jsonファイルのコンパイルを行う
  'image': 'src/assets/img/**/*', // imgファイルのコンパイルを行う
  'fonts': 'src/assets/fonts/**/*', // fontsファイルのコンパイルを行う
  'static': 'src/static/**/*' // そのままコピーしたいものを貼り付ける場所
}

const dest = {
  'root': 'dist/',
  'html': 'dist/'
}

// gulp.task('rev', () => {
//   const assetFilter = filter(['**/*', '!**/index.html'], { restore: true });
//
//   return gulp.src('src/**')
//     .pipe(assetFilter)
//     .pipe(rev()) // Rename all files except index.html
//     .pipe(assetFilter.restore)
//     .pipe(revRewrite()) // Substitute in new filenames
//     .pipe(gulp.dest('dist'));
// })

gulp.task("js", () => { // jsファイルのコンパイルが行われたら
  return webpackStream(webpackConfig, webpack).on('error', function (e) { //gulpでのエラーチェック
    this.emit('end')
  })
  .pipe(gulp.dest(dest.root+ 'assets/js/')) // assets/js/のディレクトリに出力を行う
  .pipe(browserSync.reload({stream: true})) // 自動リロード
})

gulp.task('html', () => {
  return gulp.src(src.html)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")})) // エラーが発生しても処理を継続(エラー文も表示を行う)
    .pipe(data( (file) => {
      return {
        // 'peopleData': require('./src/_data/people.json'),
        'relativePath': file.history[0].replace(file.base, '') // bodyのクラス名をディレクトリ名とお案じにするために記載
      }
    }))
    .pipe(pug({
      basedir: 'src', 
      pretty: true
    }))
    .pipe(mode.production(htmlmin({
      collapseWhitespace : true,// 余白を除去する
      minifyJS: true,// jsの圧縮
      removeComments : true// HTMLコメントを除去する
    })))
    .pipe(gulp.dest(dest.root)) //指定のディレクトリに出力
    .pipe(browserSync.reload({stream: true})) //リロード処理
})

const browsers = [
  'last 2 versions', // メジャーブラウザの最新の2バージョンに対応
  '> 5%', //シェア5%以上のブラウザに対応
  'ie = 11',
  'not ie <= 10', //バージョン10以前のIEを対象から外す。
  'ios >= 8', //iOS8以上
  'and_chr >= 5', // Chrome for Android 5以上
  'Android >= 5' //Android Browserは5以上
]

// cssファイルをdestディレクトリに出力（コピー）します。
gulp.task('css', () => {
  return gulp.src(src.css, {base: src.root})
    .pipe(gulp.dest(dest.root))
    .pipe(browserSync.reload({stream: true}))
})

// gulp stylus で実行するタスク
gulp.task('stylus', () => {
  gulp.src(src.stylus)
    .pipe(mode.development(sourcemaps.init()))
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")})) //エラーがあっても読み込みを継続(エラー文も表示)
    .pipe(stylus()) // 実際コンパイル
    .pipe(postcss([cssnext(browsers)]))
    .pipe(minifyCss({advanced:false})) //minifyする
    .pipe(mode.development(sourcemaps.write()))
    .pipe(gulp.dest(dest.root + 'assets/css/')) // assets/css/にcssのファイルを出力
    .pipe(browserSync.reload({stream: true})) //自動読み込み
})

gulp.task('image', () => {
  return gulp.src(src.image)
    .pipe(gulp.dest(dest.root + 'assets/img/')) //指定のディレクトリに移動させる
})

gulp.task('fonts', () => {
  return gulp.src(src.fonts)
    .pipe(gulp.dest(dest.root + 'assets/fonts/')) //指定のディレクトリに移動させる
})

gulp.task('static', () => {
  return gulp.src(src.static)
    .pipe(gulp.dest(dest.root)) //指定のディレクトリに移動させる
})

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: 'dist/',
      index: "/index.html"
    }
  })
})

gulp.task('watch',['html', 'stylus', 'js', 'image', 'fonts', 'static', 'browser-sync'], () => {
  gulp.watch(src.html[0], ['html'])
  gulp.watch(src.css, ['css'])
  gulp.watch(src.js, ['js'])
  gulp.watch(src.stylus, ['stylus'])
  gulp.watch(src.image, ['image'])
  gulp.watch(src.image, ['static'])
  gulp.watch(src.fonts, ['fonts'])
})

gulp.task('default', ['watch'])
gulp.task('build', ['html', 'stylus', 'js', 'image', 'fonts', 'static'])