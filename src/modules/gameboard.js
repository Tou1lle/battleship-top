function GameBoard() {
  const miss = "x";
  const board = Array(10).fill().map(() => Array(10));

  return {
    get board() {
      return board;
    }
  }
}

export { GameBoard };
