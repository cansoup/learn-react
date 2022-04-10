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

### 웹팩 데브 서버와 핫 리로딩

- 웹팩 데브 서버
  빌드의 결과물을 `dist` 폴더에 메모리로 저장하여 `index.html`실행 시 저장했던 결과물을 제공하는데, `hot-reloading` 기능을 가지고 있어 변경점을 감지할 수 있다.

### 리액트

- 랜더가 다시될 때
  - `state` 또는 `props` 에 변경이 감지되었을 때
  - setState를 사용한 경우
- `shouldComponentUpdate(nextProps, nextState)`
  - 성능 최적화만을 위한 함수. 렌더링 방지 목적으로 사용할 경우 버그로 이어질 수 있다.
  - 커스터마이징 가능
  - [공식문서](https://ko.reactjs.org/docs/react-component.html#shouldcomponentupdate)
- `PureComponent`
  - `shouldComponentUpdate`의 기능을 포함
  - 객체나 배열이 변한 경우는 변경을 감지하기 힘들다.
  - 컴포넌트를 잘게 쪼갤수록 `PureComponent`를 사용하기 용이하다.
  - [공식문서](https://ko.reactjs.org/docs/react-api.html#reactpurecomponent)
- `memo`
  - hooks의 PureComponent
