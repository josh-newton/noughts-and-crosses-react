import React, { Component } from 'react';
import './index.scss';

// Components
import Board from '../Board'
import AI from '../lib/AI.js'

window.DEBUG = true;

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

class Game extends Component {

  constructor(props){
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };

    this.ai = new AI(this.state.history[0].squares, '0');

    this.playAINextMove = this.playAINextMove.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.xIsNext !== prevState.xIsNext && this.state.xIsNext === false) {
      this.playAINextMove();
    }
  }

  playAINextMove() {
    let move = this.ai.getNextMove();
    this.handleMove(move);
  }

  handleMove(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares =  current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : '0';

    this.setState({
      history: history.concat([{
        squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });

    this.ai.updateBoard(squares);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-info">
          <p>{status}</p>
        </div>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleMove(i)}/>
        </div>
        <div className="game-history">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
