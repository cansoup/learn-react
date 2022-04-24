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
- `React.createRef()`
  - class의 ref를 hooks처럼 사용하는 방법
- `render`에서 setState 사용X - 무한루프를 야기한다.
- `useEffect`
  - [블로그](https://ko-de-dev-green.tistory.com/18)
- `Hooks`
  - 훅스의 순서는 매우 중요하다. 무조건 최상위로 유지한다.
    - 조건문 안에는 절대 넣으면 안 된다.
    - 함수나 반복문 안에도 웬만하면 넣지 않는 것이 좋다.
  - useEffect, useMemo, useCallback 안에서 useState를 사용하면 안 된다.
- Hooks React Coding 패턴
  
  ```javascript
    // componentDidMount
    useEffect(() => {
      // ajax
    }, []);
  ```

  ```javascript
    // componentDidUpdate에서만 실행하고 싶을 때 다음과 같은 패턴을 사용한다.
    // useEffect가 실행되면 componentDidMount는 무조건 실행되므로, componentDidMount에서는 아무것도 실행하지 않도록 조건문을 삽입한다.
    const mounted = useRef(false);
    useEffect(()=> {
      if(!mounted.current) {
        mounted.current = true
      } else {
        // ajax
      }
    }, [바뀌는 값]);
  ```
