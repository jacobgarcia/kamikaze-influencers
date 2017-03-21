const webpackConfig = require('./config/webpack.config.js')

webpackConfig.devtool = 'inline-source-map'

const config = (config) => {
  config.set({
    basePath: path.resolve('config'), //Look for files in this path
    browsers: process.env.TRAVIS ? ['Chrome_travis_ci'] : [ 'Chrome' ],
    singleRun: true, // Run once and end
    frameworks: [ 'mocha' ],
    files: [ 'tests.webpack.js' ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] //Apply preprocessors
    },
    reporters: [ 'dots' ], // Type of reporter to display results
    webpack: webpackConfig, // Pass webpack config
    webpackServer: {
      noInfo: true //Don't log webpack server info
    }
  })
}

module.exports = config
