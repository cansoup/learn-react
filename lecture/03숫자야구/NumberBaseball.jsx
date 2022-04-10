import React, { useState, useRef } from 'react';
import Try from './Try';

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];

  for(let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }

  return array;
}

export default function NumberBaseball() {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnser] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);
  
  const onSubmit = (e) => {
    e.preventDefault();
    if(value === answer.join('')) { // 정답
      setResult('홈런!');
      // 리액트는 참조가 바뀌는 것을 감지하여 렌더 함수를 실행한다.
      setTries([...tries, {try: value, result: '홈런!'}],);
      alert('게임을 다시 시작합니다');
        setValue('');
        setAnser(getNumbers());
        setTries([]);
    } else { // 실패
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if(tries.length >= 9) {
        setResult(`게임에 패배하였습니다. 답은 ${answer.join(', ')} 입니다.`);
        alert('게임을 다시 시작합니다');
        setValue('');
        setAnser(getNumbers());
        setTries([]);
      } else {
        for(let i = 0; i < 4; i +=1) {
          if(answerArray[i] === answer[i]){
            strike += 1;
          } else if(answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼`}]);
        setValue('');
      }
    }
    inputRef.current.focus();
  }; 

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  return (
    <>
      <h1>{ result }</h1>
      <form onSubmit={ onSubmit }>
        <input id="wordInput" className="wordInput" ref={inputRef} maxLength={ 4 } type="text" value={ value } onChange={ onChangeInput }></input>
        <button type="submit">입력!</button>
      </form>
      <div>시도: { tries.length }</div>
      <ul>
        { tries.map((value, index) => {
          return (
            <Try tryInfo={value} index={index} key={`${index+1}차 시도`}/>
          )
        }) }
      </ul>
    </>
  )
}

// 엄밀하게 말하면 export default 와 module.exports는 같지 않다. React에서는 호환되는 정도로 이해하면 된다.
// 노드 모듈 시스템(common.js) vs es2015모듈 문법
// 노드에서는 module.exports만 지원한다. 하지만 바벨이 import를 require로 변환해주는 역할을 한다.