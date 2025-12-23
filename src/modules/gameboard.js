// eslint-disable-next-line no-unused-vars
import { Ship } from "./ship.js";

/**
 * Representation of the board where Ships are placed
 * @returns Gameboard object
 */
function GameBoard() {
  const board = Array(10)
    .fill()
    .map(() => Array(10));
  const attackedCoordinates = [];
  const ships = [];
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

  /**
   * 
   * @param {Array} rowCol coordinates y(row), x(column) in an array
   * @param {string} direction string representation of horizontal or vertical
   * @param {Ship} ship ship object reprenting a piece in Battleship boardgame
   * @returns 
   */
  const placeShip = (rowCol, direction, ship) => {
    if (!hasEnouhSpace(rowCol, direction, ship) || occupied(rowCol, direction, ship)) return false;
    let [row, col] = rowCol;

    for (let i = 0; i < ship.length; i++) {
      board[row][col] = ship;
      direction === vertical ? row++ : col++ ;
    }

    ships.push(ship);
    return true;
  };

  const receiveAttack = (y, x) => {
    if (attackedCoordinates.find((arr) => arr[0] === y && arr[1] === x)) return false;

    if (!board[y][x]) {
      board[y][x] = miss;
      attackedCoordinates.push([y,x]);
      return true;
    }

    if (board[y][x] && typeof board[y][x] !== "string") {
      board[y][x].hit();
      attackedCoordinates.push([y,x]);
      return true;
    }
  }

  const allSunk = () => {
    return ships.every(ship => ship.isSunk());
  }

  return {
    get board() {
      return board;
    },
    placeShip,
    receiveAttack,
    allSunk,
    attackedCoordinates
  };
}

export { GameBoard };
