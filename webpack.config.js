const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/renderer/index.tsx',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build/renderer'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/renderer.html',
      filename: 'index.html', // Ensure this matches the expected path
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build/renderer'),
    },
    compress: true,
    port: 9000,
  },
};