const webpack = require('webpack')

module.exports = {
  output: {
    filename: "bundle.js" //Name of file
  },
  plugins: [
    //Optimize all posible code with this stuff, commment in development
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress:{
    //     warnings: false //Remove warnings, production oriented
    //   }
    // }),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/)
  ],
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
         loader: 'vue'
       }
     ]
  }
}
