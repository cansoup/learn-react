const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState('시작');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }
  
  const onSubmitAnswer = (e) => {
    e.preventDefault();

    if( word.slice(-1) === value.slice(0, 1) ) {
      setWord(value);
      setResult(`딩동댕`);
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputRef.current.focus();
    }
  }

  return (
    <>
      <div>{ word } </div>
      <form onSubmit={ onSubmitAnswer }>
        {/* for, class는 자바스크립트 예약어이므로 각각 htmlFor, className으로 대체하여 사용한다. */}
        <label htmlFor="wordInput">글자를 입력하세요.</label>
        <input id="wordInput" className="wordInput" ref={inputRef} type="text" value={value} onChange={ onChangeInput }/>
        <button type="submit">입력!</button>  
      </form>
      <div>{ result }</div>
    </>
  )
}

module.exports = WordRelay;