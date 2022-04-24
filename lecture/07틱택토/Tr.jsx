import React, {memo} from 'react';
import Td from './Td';

// memo를 사용해도 최적화가 안될 때 최후의 수단으로 useMemo를 사용할 수 있다.
// useMemo로 컴포넌트 자체를 기억하여 변화가 있을 때만 render하도록 한다.
const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log('tr rendered');

  return (
    <tr>
      { Array(rowData.length).fill().map((td, i) =>  (<Td rowIndex={rowIndex} cellIndex={i} dispatch={dispatch} key={`td-${i}`} cellData={rowData[i]} >{'1'}</Td>)) }
    </tr>
  )
  
});

export default Tr;