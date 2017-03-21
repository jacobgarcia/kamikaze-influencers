const webpackConfig = require('./config/webpack.config.js')

webpackConfig.devtool = 'inline-source-map'

const config = (config) => {
  config.set({
    basePath: './config',
    browsers: [ 'PhantomJS' ],
    singleRun: true,
    frameworks: [ 'mocha' ],
    files: [ 'tests.webpack.js' ],
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

module.exports = config
