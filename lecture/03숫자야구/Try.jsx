import React, { Component, memo, useState } from 'react';
import { render } from 'react-dom';

const Try = memo(({ tryInfo }) => {
  // tryInfo.result (X)
  // 자식은 원칙적으로 부모 컴포넌트를 변경시키지 않는다.
  // 변경시켜야할 경우 다음과 같이 부모컴포넌트의 데이터를 state에 넣어 사용한다.
  const [ result, setResult ] = useState(tryInfo.result);

  const onClick = () => {
    setResult('1');
  }
  
  return (
    <>
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    </>
  )
});

export default Try;