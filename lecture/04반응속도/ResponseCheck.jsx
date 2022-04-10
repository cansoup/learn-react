import React, { useRef, useState } from 'react';

export default function ResponseCheck() {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);

  // hooks에서는 this의 속성을 표현할 때 ref를 사용한다
  // state와 다르게 Ref는 값이 바뀌어도 render가 다시 일어나지 않는다.
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onReset = () => {
    setResult([]);
  }

  const renderAverage = () => {
    return result.length === 0 
      ? null 
      : (<>
          <div>평균 시간: { result.reduce(( a, c ) => a + c ) / result.length }ms</div>
          <button onClick={onReset}>리셋</button>
        </>)
  }
  
  const onClickScreen = () => {
    if( state === 'waiting' ) {
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭하세요.');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤

      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
    } else if(state === 'ready') { // 성급하게 클릭
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('초록색이 된 후에 클릭하세요');
    } else if(state === 'now') { // 반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => [...prevResult, endTime.current - startTime.current]);
    }
  }

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}

    </>
  )
}

// 엄밀하게 말하면 export default 와 module.exports는 같지 않다. React에서는 호환되는 정도로 이해하면 된다.
// 노드 모듈 시스템(common.js) vs es2015모듈 문법
// 노드에서는 module.exports만 지원한다. 하지만 바벨이 import를 require로 변환해주는 역할을 한다.