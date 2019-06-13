const { src, dest, watch, parallel } = require('gulp')
const pug = require('gulp-pug')
const data = require('gulp-data')
const stylus = require('gulp-stylus')
const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const htmlmin = require('gulp-htmlmin')
const mode = require('gulp-mode')({
  modes: ['production', 'development'],
  default: 'development',
  verbose: false,
})
const isProduction = mode.production()

const webpackConfigDev = require('./webpack.dev')
const webpackConfigProd = require('./webpack.prod')
const webpackConfig = isProduction ? webpackConfigProd : webpackConfigDev

const srcPath = {
  html: [
    'src/pages/**/*.pug',
    '!' + 'src/**/_*.pug',
  ],
  stylus: 'src/**/*.styl',
  js: 'src/**/*.js',
  image: 'src/assets/img/**/*',
  fonts: 'src/assets/fonts/**/*',
  static: 'src/static/**/*',
}

const destPath = {
  root: 'dist/',
  assets: 'dist/assets/',
}

const jsFunc = () => {
  return webpackStream(webpackConfig, webpack)
    .on('error', function(e) {
      this.emit('end')
    })
    .pipe(dest(`${destPath.assets}js/`))
    .pipe(browserSync.reload({ stream: true }))
}

const htmlFunc = () => {
  return src(srcPath.html)
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(
      data(file => {
        return {
          relativePath: file.history[0].replace(file.base, ''),
        }
      })
    )
    .pipe(
      pug({
        basedir: 'src',
        pretty: true,
      })
    )
    .pipe(
      mode.production(
        htmlmin({
          collapseWhitespace: true,
          minifyJS: true,
          removeComments: true,
        })
      )
    )
    .pipe(dest(destPath.root))
    .pipe(browserSync.reload({ stream: true }))
}

const browsers = [
  'last 2 versions',
  '> 5%',
  'ie = 11',
  'not ie <= 10',
  'ios >= 8',
  'and_chr >= 5',
  'Android >= 5',
]

const stylusFunc = () => {
  return src('src/assets/stylus/*.styl')
    .pipe(mode.development(sourcemaps.init()))
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(stylus())
    .pipe(postcss([cssnext(browsers)]))
    .pipe(cleanCSS())
    .pipe(mode.development(sourcemaps.write()))
    .pipe(dest(`${destPath.assets}css/`))
    .pipe(browserSync.reload({ stream: true }))
}

const imageFunc = () => {
  return src(srcPath.image)
    .pipe(dest(`${destPath.assets}img/`))
}

const fontsFunc = () => {
  return src(srcPath.fonts)
    .pipe(dest(`${destPath.assets}fonts/`))
}

const staticFunc = () => {
  return src(srcPath.static)
    .pipe(dest(destPath.root))
}

const browserSyncFunc = () => {
  browserSync({
    server: {
      baseDir: 'dist/',
      index: 'index.html',
    },
  })
}

const watchFiles = () => {
  watch(srcPath.html[0], htmlFunc)
  watch(srcPath.stylus, stylusFunc)
  watch(srcPath.js, jsFunc)
  watch(srcPath.image, imageFunc)
  watch(srcPath.static, staticFunc)
  watch(srcPath.fonts, fontsFunc)
}

exports.default = parallel(
  watchFiles, browserSyncFunc
)

exports.build = parallel(htmlFunc, stylusFunc, jsFunc, imageFunc, staticFunc, fontsFunc)
