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
  });

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
  });
});

describe("GameBoard board Creation & Ship Placing", () => {
  test("object creation - Gameboard is made out of unique Rows and Collumns", () => {
    const gameboard = GameBoard();
    const ship = Ship(2);
    gameboard.board[0][0] = ship;
    
    expect(gameboard.board[0][0] == gameboard.board[2][0]).toBeFalsy();
  });

  test("object creation - Board is created with undefined", () => {
    const gameboard = GameBoard();
    const ship = Ship(2);
    gameboard.board[0][0] = ship;
    
    expect(gameboard.board[0][1]).toBeUndefined();
    expect(gameboard.board[0][0]).toBe(ship);
  });

  test("placeShip - Able to put Ship at empty coordinates vertically", () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    expect(gameboard.placeShip([0,0], "vertical", ship)).toBeTruthy();
    
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[1][0]).toBe(ship);
    expect(gameboard.board[2][0]).toBe(ship);
    expect(gameboard.board[3][0]).toBeUndefined();
    expect(gameboard.board[0][1]).toBeUndefined();
  });

  test("placeShip - Able to put Ship at empty coordinates horizontally", () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    expect(gameboard.placeShip([0,0], "horizontal", ship)).toBeTruthy();
    
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[0][1]).toBe(ship);
    expect(gameboard.board[0][2]).toBe(ship);
    expect(gameboard.board[0][3]).toBeUndefined();
    expect(gameboard.board[1][0]).toBeUndefined();
  });

  test("placeShip - Not able to use out of bound values (< 0 or > 9) Vertical", () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    expect(gameboard.placeShip([0, 10], "vertical", ship)).toBeFalsy();
  })

  test("placeShip - Not able to use out of bound values (< 0 or > 9) Horizontal", () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    expect(gameboard.placeShip([-1, 0], "horizontal", ship)).toBeFalsy();
  })

  test("placeShip - Not able to put ship on occupied slot Vertical", () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    const otherShip = Ship(5);

    expect(gameboard.placeShip([4, 0], "horizontal", ship)).toBeTruthy();
    expect(gameboard.placeShip([1, 1], "vertical", otherShip)).toBeFalsy();
    expect(gameboard.board[1][1]).toBeUndefined();
  })

  test("placeShip - Not able to put ship on occupied slot Horizontal", () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    const otherShip = Ship(5);

    expect(gameboard.placeShip([0, 3], "vertical", ship)).toBeTruthy();
    expect(gameboard.placeShip([1, 1], "horizontal", otherShip)).toBeFalsy();
    expect(gameboard.board[1][1]).toBeUndefined();
  })

  test("placeShip - Place more than 1 ship", () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    const otherShip = Ship(5);

    expect(gameboard.placeShip([4, 3], "vertical", ship)).toBeTruthy();
    expect(gameboard.placeShip([1, 1], "horizontal", otherShip)).toBeTruthy();
    expect(gameboard.board[1][1]).toBe(otherShip);
    expect(gameboard.board[5][3]).toBe(ship);
  })
});
