function GameBoard() {
  const board = Array(10)
    .fill()
    .map(() => Array(10));
  const miss = "x";
  const lowerEdge = 0;
  const upperEdge = board.length - 1;
  const vertical = "vertical";
  const horizontal = "horizontal";

  const withinBounds = (n) => {
    return n >= lowerEdge && n <= upperEdge;
  };

  const hasEnouhSpace = (rowCol, direction, ship) => {
    let [row, col] = rowCol;
    if (!withinBounds(row) || !withinBounds(col)) return false;
    if (direction != vertical && direction != horizontal) throw new Error("Invalid direction");

    let checkDirection = (direction === vertical) ? row : col;
    for (let i = 0; i < ship.length; i++) {
      if (!withinBounds(checkDirection)) return false;
      checkDirection++;
    }

    return true;
  };

  const occupied = (rowCol, direction, ship) => {
    let [row,col] = rowCol;
    for (let i = 0; i < ship.length; i++) {
      if (board[row][col]) return true;
      direction === vertical ? row++ : col++;
    }

    return false;
  }

  const placeShip = (rowCol, direction, ship) => {
    if (!hasEnouhSpace(rowCol, direction, ship) || occupied(rowCol, direction, ship)) return false;
    let [row, col] = rowCol;

    for (let i = 0; i < ship.length; i++) {
      board[row][col] = ship;
      direction === vertical ? row++ : col++ ;
    }

    return true;
  };

  return {
    get board() {
      return board;
    },
    placeShip,
  };
}

export { GameBoard };
