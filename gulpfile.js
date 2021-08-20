const { src, dest, watch, parallel } = require('gulp')
const less = require('gulp-less')
const minifyCSS = require('gulp-csso')
const concat = require('gulp-concat')
const svgSprite = require('gulp-svg-sprite')
const imagemin = require('gulp-imagemin')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const strip = require('gulp-strip-comments')
const sftp = require('gulp-sftp')
const gwatch = require('gulp-watch')
const changed = require('gulp-changed')
const through2 = require('through2')

// For file names and theme name
const PROJECT_NAME = 'shoporama-boilerplate'

const BABEL_CONFIG = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            '>0.25%',
            'ie 11',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9',
          ],
        },
        corejs: 2,
        modules: false,
        useBuiltIns: 'entry',
      },
    ],
  ],
}

// Creates SVG sprite
function sprite() {
  return src('src/svg/*.svg')
    .pipe(
      svgSprite({
        shape: {
          // Set maximum dimensions
          dimension: {
            maxWidth: 32,
            maxHeight: 32,
          },
          // Convert style to attributes
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    removeAttrs: {
                      attrs: '(fill.*|stroke.*|transform.*)',
                    },
                  },
                  {
                    inlineStyles: true,
                  },
                ],
              },
            },
          ],
        },
        mode: {
          symbol: true,
        },
      })
    )
    .pipe(dest('./dist'))
}

// Compilation and minifying of less files
function css() {
  return src(['src/less/master.less'])
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(concat('master.min.css'))
    .pipe(dest('./dist/css'))
}

// Transpiling and minification of vendor files
function vendors() {
  return src(['src/vendors/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel(BABEL_CONFIG))
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(strip())
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/js'))
}

// Transpiling and minification of component javascript files
function js() {
  return src(['src/js/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel(BABEL_CONFIG))
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(strip())
    .pipe(concat('master.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/js'))
}

// Copying font files to dist
function fonts() {
  return src('src/fonts/**/*').pipe(dest('./dist/fonts'))
}

// Moves all changed files to dist folder
function theme() {
  const destination = './dist'
  return src('src/theme/**/*')
    .pipe(changed(destination))
    .pipe(dest(destination))
}

// Optimizes images and copy to dist folder
function img() {
  return src('src/img/**/*').pipe(imagemin()).pipe(dest('./dist/img'))
}

// Start command for development
function start() {
  watch('src/less/**/*.less', css)
  watch('src/img/**/*', img)
  watch('src/svg/**/*', sprite)
  watch('src/js/**/*.js', js)
  watch('src/theme/**/*', theme)
}

// Live command for deploying files on save
const configs = require('./config.json')

function getConnection(config) {
  return sftp({
    host: 'imali.pil.dk',
    user: config.user,
    pass: config.password,
    port: 5000,
    remotePath: PROJECT_NAME,
  })
}

// Deploy, deploys to all sites
function synchro(done) {
  return through2.obj(
    function (data, enc, cb) {
      cb()
    },
    function (cb) {
      cb()
      done()
    }
  )
}

function deploy(done) {
  var doneCounter = 0
  function incDoneCounter() {
    doneCounter += 1
    if (doneCounter >= configs.length) {
      done()
    }
  }

  for (var i = 0; i < configs.length; ++i) {
    src('./dist/**/*')
      .pipe(getConnection(configs[i]))
      .pipe(synchro(incDoneCounter))
  }
}

// Live only runs on first configurated site
function live() {
  return gwatch('dist/**/*', { ignoreInitial: true }).pipe(
    getConnection(configs[0])
  )
}

exports.start = start
exports.live = live
exports.js = js
exports.fonts = fonts
exports.img = img
exports.sprite = sprite
exports.css = css
exports.theme = theme
exports.deploy = deploy
exports.vendors = vendors

exports.default = parallel(css, js, vendors, fonts, sprite, img, theme)
