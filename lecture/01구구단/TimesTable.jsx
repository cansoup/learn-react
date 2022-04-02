const React = require('react');
const { useState, useRef } = React;

const TimesTable = () => {
  const [num1, setNum1] = useState(Math.ceil(Math.random()*9));
  const [num2, setNum2] = useState(Math.ceil(Math.random()*9));
  const [result, setResult] = useState('');
  const [answer, setAnswer] = useState('');
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setAnswer(e.target.value);
  }

  const onSubmitAnswer = (e) => {
    e.preventDefault();

    if( num1 * num2 === parseInt(answer)) {
      setNum1(Math.ceil(Math.random() * 9));
      setNum2(Math.ceil(Math.random() * 9));
      setResult(`정답은 ${answer}`);
      setAnswer('');
      inputRef.current.focus();
    } else {
      setResult('땡');
      setAnswer('');
      inputRef.current.focus();
    }
  }

  return (
    <>
      <div>{ num1 } 곱하기 { num2 }는? </div>
      <form onSubmit={ onSubmitAnswer }>
        <input ref={inputRef} type="number" value={answer} onChange={ onChangeInput }/>
        <button type="submit">입력!</button>  
      </form>
      <div>{ result }</div>
    </>
  )
}

module.exports = TimesTable;