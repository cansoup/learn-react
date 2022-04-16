import React, { useState, useRef, useEffect } from 'react';

/** 훅스는 라이프사이클이 존재하지 않는다. */
/** useEffect : componentDidMount 등 라이프싸이클 함수와 비슷한 역할을 수행한다. */

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
}

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
}

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
}

export default function RockSicssorPaper() {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  /** useEffect를 여러번 사용 가능하다. */
  useEffect(() => { // componentDidMont, componentDidUpdate의 역할을 수행한다(1대 1 대응 X)
    interval.current = setInterval(changeHand, 100);
    return () => { //componentWillUnmount 역할
      clearInterval(interval.current);
    }
  }, [imgCoord]);
  // 두 번째 인수 배열에 넣은 값(예제에서는 imgCoord)들이 바뀔 때 useEffect가 실행된다.
  // - 빈 배열인 경우에도 setInterval은 실행되므로 changeHand는 계속 실행된다. 
  // - 그림이 바뀌지 않는 이유는 changeHand 내부의 imgCoord가 바뀌지 않기 때문이다.
  // - changeHand가 실행될 때 imgCoord를 바꾸기 위해 두 번째 인자로 [imgCoord]가 필요하다

  const changeHand = () => {
    if(imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if(imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if(imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  }

  /** 고차함수 */
  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if(diff === 0) {
      setResult('비겼습니다!');
    } else if([-1, 2].includes(diff)) {
      setResult('이겼습니다!');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('졌습니다!');
      setScore(prevScore => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 2000)
  }

  return(
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className='btn' onClick={onClickBtn('바위')}>바위</button>
        <button id="scissor" className='btn' onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className='btn' onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  )
};

