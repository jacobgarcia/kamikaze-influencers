const webpack = require('webpack')

module.exports = {
  output: {
    filename: "bundle.js"
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress:{
    //     warnings: false //Remove warnings, production oriented
    //   }
    // })
  ],
  module: {
    loaders: [
       {
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: /node_modules/,
         query: {
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
