const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: './src/client/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: './images/[name].[ext]',
    clean: true
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.s[ac]ss$/i,
      use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader']
    }, {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource'
    }, {
      test: /\.svg$/i,
      type: 'asset/inline'
    }]
  },
  devServer: {
    contentBase: './dist',
    port: 8080
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/client/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new MiniCSSExtractPlugin({
      filename: './assets/css/[name].css',
    })
  ]
};