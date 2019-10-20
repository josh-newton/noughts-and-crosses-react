import React, { Component } from 'react';
import './index.scss';

// Components
import Board from '../Board'
import AI from '../lib/AI.js'
import Logic from '../lib/Logic.js'

window.DEBUG = true;

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

    this.logic = new Logic();
    this.ai = new AI(this.state.history[0].squares, '0');

    this.playAINextMove = this.playAINextMove.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares =  current.squares.slice();
    const xIsNext = this.state.xIsNext;
    const isAITurn = xIsNext !== prevState.xIsNext && !xIsNext;
    const stepNumber = this.state.stepNumber;
    const isANewMove = (stepNumber > prevState.stepNumber) && (stepNumber === (history.length - 1)); // i.e. user is not reviewing previous moves from history
    const isGameOver = this.logic.calculateWinner(squares) || this.logic.calculateDraw(squares);

    if (isAITurn && isANewMove && !isGameOver) {
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
    if (this.logic.calculateWinner(squares) || squares[i]) {
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
    const winner = this.logic.calculateWinner(current.squares);
    const draw = !winner && this.logic.calculateDraw(current.squares);

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
    } else if (draw) {
      status = 'Draw!'
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
