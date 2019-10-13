class AI {
  constructor() {}

  getNextMove(board) {
    // This will be a heirarchy of AI moves
    // For now just pick a move at random
    return this.getRandomMove(board);
  }

  getRandomMove(board) {
    let move, isTaken = true;
    while(isTaken) {
      move = Math.floor(Math.random() * 9);
      isTaken = board[move] !== null;
    }
    return move;
  }

}


export default AI;
