const webpack = require('webpack')

module.exports = {
  output: {
    filename: 'bundle.min.js'
  },
  devtool: 'eval',
  plugins: [
    // https://github.com/davezuko/react-redux-starter-kit/issues/1016#issuecomment-271617796
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env.NODE_ENV': '"development"'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true, //important for performance
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}
