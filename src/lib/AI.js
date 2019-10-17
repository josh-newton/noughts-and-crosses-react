class AI {
  constructor(board) {
    this.board = board;
  }

  updateBoard(board) {
    this.board = board;
  }

  isMoveTaken(move) {
    let board = this.board;
    return board[move] !== null;
  }

  takeCentre() {
    let centre = 4;
    return !this.isMoveTaken(centre) ? 4 : false;
  }

  takeCorner() {
    let corners = [0,2,6,8];
    for (let corner of corners) {
      if (!this.isMoveTaken(corner)) {
        return corner;
      }
    }
    return false;
  }

  getNextMove() {
    // This will be a heirarchy of AI moves
    // For now just pick a move at random
    return (
      this.takeCentre() ||
      this.takeCorner() || // If corner is 0 this is skipped
      this.randomMove()
    );
  }

  randomMove() {
    let move, rand, possMoves = [], board = this.board;

    for(let i = 0; i < board.length; i++){
      if (!this.isMoveTaken(i)) {
        possMoves.push(i);
      }
    }
    rand = Math.floor(Math.random() * possMoves.length);
    return possMoves[rand];
  }

}


export default AI;
