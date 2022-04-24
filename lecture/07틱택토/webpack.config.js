const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  name: 'word-relay-setting',
  mode: 'development', // 실서비스: Production
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  
  entry: { // 입력
    app: ['./client'],
  },

  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 1% in KR'], // browserslist
            }
          }], 
          '@babel/preset-react',
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-refresh/babel',
          'react-hot-loader/babel',
        ],
      }
    }]
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
  output: { // 출력
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist', /** webpack-dev-server가 사용하는 결과물간의 상대 경로 */
  },
  devServer: {
    devMiddleware: {publicPath: '/dist'},
    static: { directory: path.resolve(__dirname)},
    hot: true
  },
}