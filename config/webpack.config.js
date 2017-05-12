const webpack = require('webpack')

const config = {
  output: {
    filename: 'bundle.min.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false //Remove warnings, production oriented
      }
    })
  ],
  module: {
    loaders: [
       {
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: [/node_modules/, /__test__/],
         query: {
           'presets': ['react', 'es2015']
         }
       },
       {
         test: /\.json$/,
         loader: 'json-loader'
       }
     ]
  }
}

process.noDeprecation = true
module.exports = config
