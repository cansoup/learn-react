import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

// useReducer: state를 하나로 관리할 수 있다.
const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''], 
    ['', '', ''], 
    ['', '', '']],
  recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const SET_TURN = 'SET_TURN';
export const RESET_GAME = 'RESET_GAME';

// reducer 함수 안에서 state를 어떻게 변경할지 정한다.
// dispatch가 실행되었을 때의 액션 타입으로 식별한다.
const reducer = (state, action) => {
  switch(action.type) {
    case SET_WINNER:
      // (X) state.winner = action.winner
      return {
        ...state,
        winner: action.winner
      };
    case CLICK_CELL:
      // 불변성을 위해 아래와 같이 얕은 복사를 진행한다.
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell]
      };
    case SET_TURN:
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      }
    case RESET_GAME:
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''], 
          ['', '', ''], 
          ['', '', '']
        ],
        recentCell: [-1, -1],
      }
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  // 자식 컴포넌트로 전달할 함수는 useCallback 사용 권장
  // dispatch를 실행하면 reducer 함수가 실행된다.
  const onClickTable = useCallback(() => {
    console.log('table clicked')
    dispatch({ type: SET_WINNER, winner: 'O'});
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    
    if(row < 0) { 
      return;
    }

    let win = false;
    if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    if( win ) {
      // 승리
      dispatch({ type: SET_WINNER, winner: turn});
      dispatch({ type: RESET_GAME });
    } else {
      // 무승부 검사
      let all = true; //all이 true면 무승부
      tableData.forEach( (row) => {
        row.forEach( (cell) => {
          if(!cell) {
            all = false;
          }
        })
      })

      if(all) {
        dispatch({ type: RESET_GAME });
      } else {
        // 승리가 아니면 턴을 변경한다.
        dispatch({ type:SET_TURN });
      }
    }
  }, [recentCell]);

  return (
    <>
      <Table onClick={onClickTable} tableData={ tableData } dispatch={ dispatch } />
      {winner && <div>{winner}님의 승리</div>}
    </>
  )
};

export default TicTacToe;

