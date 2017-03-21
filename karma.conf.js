const webpackConfig = require('./config/webpack.config.js')

webpackConfig.devtool = 'inline-source-map'

const config = (config) => {
  config.set({
    basePath: path.resolve('config'), //Look for files in this path
    browsers: [ 'PhantomJS' ],
    singleRun: true,
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
