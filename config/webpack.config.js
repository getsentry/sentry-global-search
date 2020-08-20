const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    search: ['./src/search-demo.js'],
    parse: ['./src/parse-demo.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(process.cwd(), './src/index.html'),
      chunks: ['search'],
      filename: './index.html',
    }),
    new HtmlWebPackPlugin({
      template: path.join(process.cwd(), './src/index.html'),
      chunks: ['parse'],
      filename: './parse/index.html',
    }),
  ],
};
