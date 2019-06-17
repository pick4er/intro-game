/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = function configWebpack(props) {
  const { production = true } = props;

  return {
    mode: production ? 'production' : 'development',
    devtool: production ? 'cheap-source-map' : 'source-map',
    entry: {
      index: './src/client/index.js',
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, '..', 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/client/index.html',
      }),
    ],
  };
};
