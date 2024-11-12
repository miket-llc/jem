const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/renderer/index.tsx',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    output: {
      path: path.resolve(__dirname, 'build/renderer'),
      filename: isProduction ? 'bundle.js' : 'renderer.js',
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
        filename: 'index.html',
        inject: 'body',
        scriptLoading: 'blocking',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode),
      }),
    ],
  };
};