import React, { Component } from 'react';
import './index.scss';

// Components
import Board from '../Board'

class Game extends Component {

  constructor(props){
    super(props);

    this.state = {};
  }

  render() {
    const {} = this.state;

    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{ /* status */ }</div>
          <ol>{ /* TODO */ }</ol>
        </div>
      </div>
    );
  }
}

export default Game;
