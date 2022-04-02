const path = require('path');

module.exports = {
  name: 'times-table-setting',
  mode: 'development', // 실서비스: Production
  devtool: 'eval', // hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx']
  },
  
  entry: { // 입력
    app: './client',
  },

  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      }
    }]
  },

  output: { // 출력
    filename: 'app.js',
    path: path.join(__dirname, 'dist')
  },
}