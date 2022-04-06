import React, { useState, useRef } from 'react';
import Try from './Try';

function getNumbers() {

}

export default function NumberBaseball() {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnser] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onSubmit = () => {

  }; 

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  return (
    <>
      <h1>{ result }</h1>
      <form onSubmit={ onSubmit }>
        <input maxLength={ 4 } type="text" value={ value } onChange={ onChangeInput }></input>
        <button type="submit">입력!</button>
      </form>
      <div>시도: { tries.length }</div>
      <ul>
        { ['like', 'like'].map((value, index) => {
          return (
            <Try value={value} index={index} key={`${value}-${index}`}/>
          )
        }) }
      </ul>
    </>
  )
}

// 엄밀하게 말하면 export default 와 module.exports는 같지 않다. React에서는 호환되는 정도로 이해하면 된다.
// 노드 모듈 시스템(common.js) vs es2015모듈 문법
// 노드에서는 module.exports만 지원한다. 하지만 바벨이 import를 require로 변환해주는 역할을 한다.