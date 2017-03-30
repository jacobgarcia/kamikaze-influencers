const gulp = require('gulp')
const sass = require('gulp-sass')
const nodemon = require('gulp-nodemon')
const rename = require('gulp-rename')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const webpackConfig = require('./config/webpack.config.js')
const webpackDevConfig = require('./config/dev.webpack.config.js')
const path = require('path')
const Server = require('karma').Server

gulp.task('sass', () =>
  gulp.src('./src/styles/master.scss')
  .pipe(sass({ outputStyle: 'compressed' })
  .on('error', sass.logError))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist'))
)

gulp.task('devwebpack', () =>
  gulp.src(path.resolve('src/js/index.js'))
  .pipe(webpackStream(webpackDevConfig, webpack))
  .on('error', function handleError() {
    this.emit('end')
  })
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist'))
)

gulp.task('webpack', () =>
  gulp.src(path.resolve('src/js/index.js'))
  .pipe(webpackStream(webpackConfig, webpack))
  .on('error', function handleError() {
    this.emit('end')
  })
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist'))
)


gulp.task('start', () => {
    nodemon({
        script: 'server.js',
        ignore: ['/src'],
        env: {
            'NODE_ENV': 'development'
        }
    })
})

gulp.task('test', (done) => {
  new Server({
    configFile: path.resolve('karma.conf.js'),
    singleRun: true
  }, done).start()
})

gulp.task('watch', () => {
    gulp.watch(['src/js/**/*.js', 'src/js/**/*.vue'], ['devwebpack'])
    gulp.watch('src/styles/**.scss', ['sass'])
})

gulp.task('develop', ['sass', 'devwebpack', 'start', 'watch'])
gulp.task('build', ['sass', 'webpack'])
