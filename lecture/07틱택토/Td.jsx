import React, { memo, useCallback, useEffect, useRef } from 'react';
import { CLICK_CELL, SET_TURN } from './TicTacToe';

const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) => {
  console.log('td rendered');
  // 최적화하지 않았을 때 변화가 없는 Td가 다시 render된 이유를 아래의 방법을 통해 알아낼 수 있다.
  const ref = useRef([]);
  useEffect(() => {
    // 값이 false인 요소 때문에 render가 다시 실행된다.
    // 이 경우 cellData가 render가 다시 실행되는 원인이었다.
    // memo를 사용하면 변하지 않은 나머지 td들이 모두 다시 render되는 것을 막을 수 있다.
    // console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3])
    ref.current = [rowIndex, cellIndex, dispatch, cellData];
  }, [rowIndex, cellIndex, dispatch, cellData]);

  const onClickTd = useCallback(() => {
    if(cellData) {
      return;
    }
    // dispatch에서 state는 비동기적으로 바뀐다.
    // 비동기 state에서 뭔가를 처리하려면 useEffect를 사용해야 한다.
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData])

  return (
    <td onClick={onClickTd}>{cellData}</td>
  )
  
})

export default Td;