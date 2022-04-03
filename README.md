# learn-react

웹 게임을 만들며 배우는 React 강의를 수강합니다.

- [리액트 공식 문서](https://ko.reactjs.org/languages)

## WebPack

- [공식문서](https://webpack.js.org/)

### babel/preset-env

- preset : plugins들의 모음
- [browserslist](https://github.com/browserslist/browserslist)

  ```javascript
  module.exports = {
    ...
    module: {
      rules: [{
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              /* 자동으로 옛날 브라우저를 지원해주는 프리셋 */
              '@babel/preset-env', 
              /* 원하는 브라우저에 맞게 지원 가능 */
              /* browserslist 참고 */
              targets: { 
                browsers: ['> 1% in KR'], 
              } /* 설정 */
            ], 
            '@babel/preset-react'
          ],
          plugins: ['@babel/plugin-proposal-class-properties'],
        }
      }]
    },
    ...
  }
  ```

- plugiins
  
  ```javascript
    module.exports = {
      ...
      plugins = [
        new webpack.LoaderOptionsPlugin({ debug: true })
      ]
      ...
    }
  ```
