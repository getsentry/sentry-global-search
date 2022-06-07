const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    search: ['./src/demo/search-demo.tsx'],
    parse: ['./src/demo/parse-demo.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      path: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: false,
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/demo/index.html',
      chunks: ['search'],
      filename: './index.html',
    }),
    new HtmlWebPackPlugin({
      template: 'src/demo/index.html',
      chunks: ['parse'],
      filename: './parse/index.html',
    }),
  ],
};
