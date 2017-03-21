const webpackConfig = require('./config/webpack.config.js')

webpackConfig.devtool = 'inline-source-map'

const config = (config) => {
  config.set({
    basePath: './config',
    browsers: process.env.TRAVIS ? ['Chrome_travis_ci'] : [ 'Chrome' ],
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
