import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props)  {
  function renderSquare(i) {
    return (<Square  value={props.squares[i]}
    onClick={() => props.onClick(i)}/>)
  }
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() { 
  let [history,setHistory] = useState([{squares:Array(9).fill(null)}]);
  let [stepNumber,setStepNumber] = useState(0);
  let [xIsNext,setXIsNext] = useState(true);
  function handleClick(i) {
    let historyObj = history.slice(0, stepNumber + 1);
    const current = historyObj[historyObj.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    
    setHistory(
      history.concat([{squares:squares}])
    )
    setStepNumber(
      history.length
    )
    setXIsNext(
      !xIsNext
    )
  }

  function jumpTo(step) {
    setStepNumber(
      step
    )
    setXIsNext(
      step%2 ===0
    )
  }
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move Number ' + move :
        'Go to start';
      return (
        <li key={move}>
          <button className="historyButton" onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = 'Winner :- ' + winner;
    } else {
      status = 'Next player :- ' + (xIsNext ? 'X' : 'O');
    }
    return (
      <div>
          <div className="game">
          <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => handleClick(i)}
          />
          </div>
          <div className="game-info">
            <div className="status">{ status }</div>
            <ol className='orderedList'>{moves}</ol>
          </div>
          </div>
      </div> 
    );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);




// function Board(props)  {
//   // let squares = props.squares;
//   // const moves = squares.map((item, index) => {
//   //   return (
//   //     <div className="board-row">
//   //       {renderSquare(index)}
//   //     </div>
//   //   );
//   // });
//   // function renderSquare(i) {
//   //   return (<Square  value={props.squares[i]}
//   //   onClick={() => props.onClick(i)}/>)
//   // }
//   // return (
//   //   <div>
//   //     {moves}
//   //   </div>
//   // );
// }
