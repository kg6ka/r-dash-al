var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var isProduction = process.env.NODE_ENV === 'production';

var stylesLoader = [
  'style',
  'css?modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]',
  'postcss',
  'sass?outputStyle=expanded&sourceMap'
];

var config = {
  devtool: 'inline-source-map',
  entry: ['webpack/hot/dev-server', 'babel-polyfill', './src/index'],

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js'],
    root: path.join(__dirname, 'src'),
  },
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.png?$/, loader: 'file' },
      {
        test: /\.scss$/,
        loader: isProduction
          ? ExtractTextPlugin.extract.apply(ExtractTextPlugin, stylesLoader)
          : stylesLoader.join('!')
      },
      {
          test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
          loader: 'url-loader'
      }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions', 'ie 10'] }) ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new ExtractTextPlugin('styles.css'));
} else {
  config.entry.unshift("webpack-dev-server/client?http://localhost:3000/");
}


module.exports = config;
