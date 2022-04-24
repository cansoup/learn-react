import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while(candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumber = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumber, bonusNumber];
}

// useEffect, useCallback, useMemo 의 두 번째 인자는 어떤 경우에 각각을 재실행할지 결정한다.

// useCallback: 함수 자체를 기억한다. 
//    -> 함수 자체를 기억해서 함수 컴포넌트가 다시 실행되어도 함수를 재생성하지 않는다. ex) onClickRedo
//    -> 함수의 volume이 클 때 사용하면 좋다.
//    -> useCallback 안에서 쓰이는 state는 두 번째 인자로 넘겨주어야 한다.
//    -> 자식 컴포넌트에 props로 함수를 넘길 때, 넘기는 함수에는 useCallback을 필수로 적용해야 한다. (부모가 다시 render될 때마다 새로운 함수로 인식하여 자식 컴포넌트도 불필요하게 다시 render되기 때문)
// useMemo: 복잡한 함수의 return value를 기억한다.
// useRef: 일반 값을 기억한다.

const Lotto = () => {
  // 위의 이슈를 해결하기 위해 useMemo를 사용한다 -> useMemo의 두 번째 인자의 요소가 바뀌지 않으면, getWinNumbers는 다시 실행되지 않는다.
  // Hooks가 getWinNumbers의 return value를 기억한다.
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  // [이슈]Hooks의 특성상 state가 변경될 때마다 함수 전체가 다시 실행된다 -> getWinNumbers()가 매번 실행된다. 
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  // componentDidUpdate, componentDidMount, componentWillUnmount는 useEffect로 대응할 수 있다.
  useEffect(() => {
    console.log('useEffect');
    for (let i=0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]])
      }, (i + 1) * 1000);
    }

    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    return () => {
      timeouts.current.forEach((v)=>{
        clearTimeout(v);
      })
    }
  }, [timeouts.current]); 
  // 두 번째 인자가 빈 배열이면 componentDidMount와 동일하다
  // 두 번째 인자에 요소가 있으면 componentDidMount와 componentDidUpdate 모두 수행한다.
  const onClickRedo = useCallback(() => {
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);

    timeouts.current = [];
  }, [winNumbers]);

  return ( 
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v)=> <Ball key={v} number={v}/>)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  )
}

export default Lotto;

