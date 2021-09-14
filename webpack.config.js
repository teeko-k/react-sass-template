/* eslint-disable no-unused-vars */
const HtmlWbepackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { env } = require('process')

module.exports = (_, { mode }) => ({
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'styles.min.css',
    }),
    new HtmlWbepackPlugin({
      title: 'React Applocation',
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /.(js(x)?)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /.((s)?(a|c)ss)$/,
        use: [
          mode === 'production' ? MiniCSSExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
  entry: {
    path: path.resolve(__dirname, 'src/js', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js',
  },
})
