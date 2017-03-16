const gulp = require('gulp')
const sass = require('gulp-sass')
const nodemon = require('gulp-nodemon')
const rename = require('gulp-rename')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

gulp.task('sass', () =>
  gulp.src('./src/styles/master.scss')
  .pipe(sass({outputStyle: 'compressed'})
  .on('error', sass.logError))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist/styles'))
)

gulp.task('webpack', () =>
  gulp.src('./src/js/app.js')
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

gulp.task('watch', () => {
    gulp.watch([
        'src/js/**/*.js', 'src/js/**/*.vue'
    ], ['webpack'])
    gulp.watch('src/styles/**.scss', ['sass'])
})

gulp.task('dev', ['sass', 'webpack', 'start', 'watch'])
gulp.task('build', ['sass', 'webpack'])
