const webpack = require('webpack')

const config = {
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
       {
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: [/node_modules/, /__test__/],
         query: {
           "presets": ["react", "es2015"]
         }
       },
       {
         test: /\.json$/,
         loader: 'json-loader'
       }
     ]
  }
}

module.exports = config
