class AI {
  constructor(board, counter) {
    this.board = board;
    this.counter = counter;
    this.opponentCounter = counter === '0' ? 'X' : '0';
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

  blockOpponent() {
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
    // This will be a heirarchy of AI moves
    // For now just pick a move at random
    return parseInt(
      this.blockOpponent() ||
      this.takeCentre() ||
      this.takeCorner() ||
      this.randomMove()
    );
  }

}


export default AI;
