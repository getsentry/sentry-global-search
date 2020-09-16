const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: ['./src/index.ts'],
    'search-demo': ['./src/demo/search-demo.tsx'],
    'parse-demo': ['./src/demo/parse-demo.tsx'],
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
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, '../src/demo/index.html'),
      chunks: ['search'],
      filename: './index.html',
    }),
    new HtmlWebPackPlugin({
      template: path.join(__dirname, '../src/demo/index.html'),
      chunks: ['parse'],
      filename: './parse/index.html',
    }),
  ],
};
