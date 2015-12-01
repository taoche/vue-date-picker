var webpack = require('webpack')

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: './static',
    publicPath: '/static/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel'
      },
      {
        test   : /\.(png|jpg|gif)$/,
        loader : 'url-loader?limit=8192'
      },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file-loader?name=/[name]_[hash:6].[ext]'
      }
    ]
  },
  vue: {
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    loaders: {
      scss: 'style!css!sass'
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}

if (process.env.NODE_ENV === 'production') {

  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}
