const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = path.resolve('src');
const example = path.resolve('example');
const nodeModules = path.resolve('node_modules');

module.exports = {
  devtool: 'eval',
  entry: [path.join(example, 'index-dom')],
  output: {
    path: path.resolve('build'),
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: '/',
  },
  resolve: { extensions: ['.js', '.json'] },
  externals: {
    timbre: 'T',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [example, src],
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('example/index.html'),
    }),
  ],
};
