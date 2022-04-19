import React, { memo } from 'react';
// 제일 마지막에 있는 자식 컴포넌트는 화면만 담고 있는 경우가 많기 때문에 PureComponent를 사용하거나 memo로 감싸준다.
// state를 사용하지 않는 컴포넌트는 함수 컴포넌트로 만드는게 낫다.
// 함수 컴포넌트 !== 훅
// 훅은 useState, useEffect 등을 말한다.
// HOC(High Order Component)

const Ball = memo(({number}) => {
  let background;
  if(number <= 10) {
    background = 'red';
  } else if(number <= 20) {
    background = 'oragne';
  } else if(number <= 30) {
    background = 'yellow';
  } else if(number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }
  return (
    <div className="ball" style={{background}}>{number}</div>
  )
});

export default Ball;