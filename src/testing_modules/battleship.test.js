/*eslint-disable no-undef*/
import { Ship } from "../modules/ship.js";
import { GameBoard } from "../modules/gameboard.js";

describe("Ship Pieces", () => {
  const destroyer = Ship(3);

  test("TimesHit increased by 1 after hit", () => {
    destroyer.hit();
    expect(destroyer.timesHit).toBe(1);
  });

  test("isSunk returns defined value", () => {
    expect(destroyer.isSunk()).toBeDefined();
  })

  test("Not sunk after 1 hit", () => {
    expect(destroyer.isSunk()).toBeFalsy();
  });

  test("Ship not sunk - length not same as timesHit", () => {
    destroyer.hit();
    expect(destroyer.isSunk()).toBeFalsy();
  });

  test("Times hit increases accordingly - Ship sunk", () => {
    destroyer.hit();
    expect(destroyer.isSunk()).toBeTruthy();
  })
});

describe("GameBoard", () => {
  const gameboard = GameBoard();
  const ship1 = Ship(2);

  test("Gameboard is made out of unique Rows and Collumns", () => {
    gameboard.board[0][0] = ship1;
    expect(gameboard.board[0][0] == gameboard.board[2][0]).toBeFalsy();
  })

  test("Board is created with undefined", () => {
    expect(gameboard.board[0][1]).toBeUndefined();
    expect(gameboard.board[0][0]).toBe(ship1);
  })
});