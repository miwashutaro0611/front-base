const { src, dest, watch, parallel } = require('gulp') //gulpを使うためのもの
const pug = require('gulp-pug') //pugを使うためのもの
const data = require('gulp-data') //jsonファイル・ディレクトリ名(bodyにclass付加)を取得するためのもの
const stylus = require('gulp-stylus') //stylusを使うためのもの
const postcss = require('gulp-postcss') //css変換後にpostcssをかけるため(ブラウザの対応のため)
const cssnext = require('postcss-cssnext') //ブラウザのリストに応じてcssを変更させるため
const plumber = require('gulp-plumber') //gulpのエラーが出ても終了させないもの
const notify = require('gulp-notify') //エラーが出たら通知を出す
const sourcemaps = require('gulp-sourcemaps') //cssのsourcemapの生成
const cleanCSS = require('gulp-clean-css') //cssの圧縮を行うもの
const browserSync = require('browser-sync') //自動読み込みのためのもの
const webpackStream = require('webpack-stream') //gulpとwebpackを接続するためのもの
const webpack = require('webpack') //webpackのバージョン指定するもの
const htmlmin = require('gulp-htmlmin') //htmlの圧縮のために使うもの
const mode = require('gulp-mode')({
  // gulp上で本番環境と開発環境を切り分けるためのもの
  modes: ['production', 'development'], //開発か本番か選択
  default: 'development', //基本は開発にする(デフォルトと同じなので非表示でも可)
  verbose: false, //詳細メッセージを表示するか(デフォルトと同じなので非表示でも可)
})
const isProduction = mode.production() //本番環境かどうかを知るために記載(本番環境ならtrue)

const webpackConfigDev = require('./webpack.dev') // 開発環境のときに実行するwebpackのファイル
const webpackConfigProd = require('./webpack.prod') // 本番環境のときに実行するwebpackのファイル
const webpackConfig = isProduction ? webpackConfigProd : webpackConfigDev //本番か開発かどちらかを判断するためのもの

const srcPath = {
  // ビルドを行うファイルの一覧
  html: [
    // html(pug)ファイルのビルドの条件
    'src/pages/**/*.pug', //pagesの中にあるディレクトリのものを読み込む
    '!' + 'src/**/_*.pug', // layouts,mixinなどの_(アンダーバー)が最初についているものについては除外
  ],
  stylus: 'src/**/*.styl', //stylus直下に入っているstylファイルのみコンンパイルを行う
  js: 'src/**/*.js', // jsのファイルのコンパイルを行う
  image: 'src/assets/img/**/*', // imgファイルのコンパイルを行う
  fonts: 'src/assets/fonts/**/*', // fontsファイルのコンパイルを行う
  static: 'src/static/**/*', // そのままコピーしたいものを貼り付ける場所
}

const destPath = {
  //出力を行うディレクトリを変数として管理する
  root: 'dist/', //htmlなどのビルドを行う時のベースのパス
  assets: 'dist/assets/', //css,jsなどのビルドを行う時のベースのパス
}

const jsFunc = () => {
  // jsファイルのコンパイルが行われたら
  // 第一引数に実行するwebpackのpath,
  // 第二引数にwebpack-streamのwebpackのバージョン(多分1系?)なので、使いたいwebpackのバージョンを指定する(バージョンはpackage.jsonのwebpack参考)
  return webpackStream(webpackConfig, webpack)
    .on('error', function(e) {
      // errorでwatchが止まらないように
      this.emit('end') //watchはendを待っているので、endを発生させることで継続させるようにする
    })
    .pipe(dest(`${destPath.assets}js/`)) // assets/js/のディレクトリに出力を行う
    .pipe(browserSync.reload({ stream: true })) // 自動リロード
}

const htmlFunc = () => {
  return src(srcPath.html) //結果をwatchへ返却する
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    ) // エラーが発生しても処理を継続(エラー文も表示を行う)
    .pipe(
      data(file => {
        //gulp-dataからjson,ディレクトリ名の取得を行う
        return {
          // 'peopleData': require('./src/posts/people.json'), //jsonのデータを取得(今はないのでコメントアウト)
          relativePath: file.history[0].replace(file.base, ''), // bodyのクラス名をディレクトリ名とお案じにするために記載
        }
      })
    )
    .pipe(
      pug({
        //pugからhtmlへの変換処理
        basedir: 'src', //ベースのurlを記載
        pretty: true, //整形を行うか
      })
    )
    .pipe(
      mode.production( //本番環境のみ
        htmlmin({
          //htmlの圧縮
          collapseWhitespace: true, // 余白を除去する
          minifyJS: true, // jsの圧縮
          removeComments: true, // HTMLコメントを除去する
        })
      )
    )
    .pipe(dest(destPath.root)) //指定のディレクトリに出力
    .pipe(browserSync.reload({ stream: true })) //リロード処理
}

const browsers = [
  // cssの対応するブラウザーを決める
  'last 2 versions', // メジャーブラウザの最新の2バージョンに対応
  '> 5%', //シェア5%以上のブラウザに対応
  'ie = 11', //ie11は対応
  'not ie <= 10', //バージョン10以前のieを対象から外す。
  'ios >= 8', //iOS8以上
  'and_chr >= 5', // Chrome for Android 5以上
  'Android >= 5', //Android Browserは5以上
]

const stylusFunc = () => {
  // gulp stylus で実行するタスク
  //上srcで全ファイルを対象にして、下のsrcは出力の場所の範囲のみにすることで、下層を編集してもstyle.cssのみにするようにする
  return src('src/assets/stylus/*.styl') //結果をwatchへ返却する
    .pipe(mode.development(sourcemaps.init())) // ソースマップを初期化(developのときのみ)
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    ) //エラーがあっても読み込みを継続(エラー文も表示)
    .pipe(stylus()) // 実際のコンパイル
    .pipe(postcss([cssnext(browsers)])) //各種ブラウザに対応させる(flexなど)
    .pipe(cleanCSS()) //1行に圧縮する
    .pipe(mode.development(sourcemaps.write())) // ソースマップの作成(developのときのみ)
    .pipe(dest(`${destPath.assets}css/`)) // assets/css/にcssのファイルを出力
    .pipe(browserSync.reload({ stream: true })) //自動読み込み
}

const imageFunc = () => {
  // gulp image で実行するタスク(コピーのみ)
  return src(srcPath.image) //結果をwatchへ返却する
    .pipe(dest(`${destPath.assets}img/`)) //指定のディレクトリに移動させる
}

const fontsFunc = () => {
  // gulp fonts で実行するタスク(コピーのみ)
  return src(srcPath.fonts) //結果をwatchへ返却する
    .pipe(dest(`${destPath.assets}fonts/`)) //指定のディレクトリに移動させる
}

const staticFunc = () => {
  // gulp static で実行するタスク(コピーのみ)
  return src(srcPath.static) //結果をwatchへ返却する
    .pipe(dest(destPath.root)) //指定のディレクトリに移動させる
}

const browserSyncFunc = () => {
  //実行時にブラウザを開く
  browserSync({
    server: {
      // ブラウザの起動を行う
      baseDir: 'dist/', // ルートとなるディレクトリ(この場合は`dist`)
      index: 'index.html', //ファイル名の指定(なくても良いが変更しやすいよう一応記載)
    },
  })
}

const watchFiles = () => { //監視ファイルの一覧
  watch(srcPath.html[0], htmlFunc) //htmlファイルの監視
  watch(srcPath.stylus, stylusFunc) //stylusファイルの監視
  watch(srcPath.js, jsFunc) //jsファイルの監視
  watch(srcPath.image, imageFunc) //imageファイルの監視
  watch(srcPath.static, staticFunc) ///staticファイルの監視
  watch(srcPath.fonts, fontsFunc) //fontsファイルの監視
}

exports.default = parallel(watchFiles, browserSyncFunc) // gulpのデフォルトの処理を記載する(ブラウザの開く処理も)

exports.build = parallel(htmlFunc, stylusFunc, jsFunc, imageFunc, staticFunc, fontsFunc) //ビルド時に行う処理
