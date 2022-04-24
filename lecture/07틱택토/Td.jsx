import React, { useCallback } from 'react';
import { CLICK_CELL, SET_TURN } from './TicTacToe';

const Td = ({rowIndex, cellIndex, dispatch, cellData}) => {
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
  
}

export default Td;