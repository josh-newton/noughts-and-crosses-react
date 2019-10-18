class AI {
  constructor(board, counter) {
    this.board = board;
    this.counter = counter;
    this.opponentCounter = counter === '0' ? 'X' : '0';
    this.winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  updateBoard(board) {
    this.board = board;
  }

  isMoveTaken(move) {
    let board = this.board;
    return board[move] !== null;
  }

  isMoveTakenByAI(move) {
    let board = this.board, counter = this.counter;
    return board[move] === counter;
  }

  isMoveTakenByOpponent(move) {
    let board = this.board, counter = this.opponentCounter;
    return board[move] === counter;
  }

  takeCentre() {
    let centre = 4;
    !this.isMoveTaken(centre) && window.DEBUG && console.log('TAKE CENTRE');
    return !this.isMoveTaken(centre) ? String(centre) : false;
  }

  takeCorner() {
    let corners = [0,2,6,8];
    for (let corner of corners) {
      if (!this.isMoveTaken(corner)) {
        window.DEBUG && console.log('TAKE CORNER: take ', corner);
        return String(corner);
      }
    }
    return false;
  }

  takeWin() {
    const lines = this.winningLines;

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      let aTaken = this.isMoveTakenByAI(a);
      let bTaken = this.isMoveTakenByAI(b);
      let cTaken = this.isMoveTakenByAI(c);

      if (aTaken && bTaken && !this.isMoveTaken(c)) {
        window.DEBUG && console.log('TAKE WIN: take ', c);
        return String(c);
      } else if(aTaken && cTaken && !this.isMoveTaken(b)) {
        window.DEBUG && console.log('TAKE WIN: take ', b);
        return String(b);
      } else if (bTaken && cTaken && !this.isMoveTaken(a)) {
        window.DEBUG && console.log('TAKE WIN: take ', a);
        return String(a);
      }
    }
    return false;
  }

  blockOpponent() {
    const lines = this.winningLines;

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      let aTaken = this.isMoveTakenByOpponent(a);
      let bTaken = this.isMoveTakenByOpponent(b);
      let cTaken = this.isMoveTakenByOpponent(c);

      if (aTaken && bTaken && !this.isMoveTaken(c)) {
        window.DEBUG && console.log('BLOCK: take ', c);
        return String(c);
      } else if(aTaken && cTaken && !this.isMoveTaken(b)) {
        window.DEBUG && console.log('BLOCK: take ', b);
        return String(b);
      } else if (bTaken && cTaken && !this.isMoveTaken(a)) {
        window.DEBUG && console.log('BLOCK: take ', a);
        return String(a);
      }
    }
    return false;
  }

  blockTakingOuterMiddle() {
    // This is an offensive move forcing the opponent to block the AIs three in
    // a row, instead of allowing opponent to take a third corner and set up a
    // definite win
    if(this.isMoveTakenByAI(4)) {
      let outers = [1,3,5,7];
      for (let outer of outers) {
        if (!this.isMoveTaken(outer)) {
          window.DEBUG && console.log('BLOCK TAKING OUTER MIDDLE: take ', outer);
          return String(outer);
        }
      }
    }

    return false;
  }

  blockByTakingOppositeCorner() {
    const lines = [
      [0, 8],
      [2, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b] = lines[i];

      let aTaken = this.isMoveTakenByOpponent(a);
      let bTaken = this.isMoveTakenByOpponent(b);
      let centreTaken = this.isMoveTakenByOpponent(4);

      if (aTaken && !this.isMoveTaken(b) && centreTaken === false) {
        window.DEBUG && console.log('BLOCK TAKING CORNER: take ', b);
        return String(b);
      } else if(bTaken && !this.isMoveTaken(a) && centreTaken === false) {
        window.DEBUG && console.log('BLOCK TAKING CORNER: take ', a);
        return String(a);
      }
    }
    return false;
  }

  randomMove() {
    let move, rand, possMoves = [], board = this.board;

    for(let i = 0; i < board.length; i++){
      if (!this.isMoveTaken(i)) {
        possMoves.push(i);
      }
    }
    rand = Math.floor(Math.random() * possMoves.length);
    window.DEBUG && console.log('RANDOM MOVE: take ', possMoves[rand]);
    return possMoves[rand];
  }

  getNextMove() {
    // Heirarchy of AI moves
    // The functions return a string instead of an int so if they return 0, as
    // in the first square, they are not skipped. I use parseInt to cast them back.
    return parseInt(
      this.takeWin() ||
      this.blockOpponent() ||
      this.takeCentre() ||
      this.blockTakingOuterMiddle() ||
      this.blockByTakingOppositeCorner() ||
      this.takeCorner() ||
      this.randomMove()
    );
  }

}

export default AI;
