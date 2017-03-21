const webpackConfig = require('./config/webpack.config.js')

webpackConfig.devtool = 'inline-source-map'

module.exports = (config) => {
  config.set({
    basePath: './config',
    browsers: [ 'Firefox', 'Safari' ],
    singleRun: true,
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'dots' ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  })
}
