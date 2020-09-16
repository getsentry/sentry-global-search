const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    index: ['./src/index.ts'],
  },
  externals: [nodeExternals()],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
