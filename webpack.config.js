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
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    loaders: [
       {
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: /node_modules/,
         query: {
           presets: ["es2015"]
         }
       },
       {
         test: /\.vue$/,
         loader: 'vue-loader'
       }
     ]
  }
}
