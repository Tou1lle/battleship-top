/*eslint-disable no-undef*/
import { Ship } from "../modules/ship.js";
import { GameBoard } from "../modules/gameboard.js";
import { Player } from "../modules/player.js";

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
    expect(gameboard.placeShip([0, 0], "vertical", ship)).toBe(true);

    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[1][0]).toBe(ship);
    expect(gameboard.board[2][0]).toBe(ship);
    expect(gameboard.board[3][0]).toBeUndefined();
    expect(gameboard.board[0][1]).toBeUndefined();
  });

  test("placeShip - Able to put Ship at empty coordinates horizontally", () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    expect(gameboard.placeShip([0, 0], "horizontal", ship)).toBeTruthy();

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
  });

  test("placeShip - Not able to use out of bound values (< 0 or > 9) Horizontal", () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    expect(gameboard.placeShip([-1, 0], "horizontal", ship)).toBeFalsy();
  });

  test("placeShip - Not able to put ship on occupied slot Vertical", () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    const otherShip = Ship(5);

    expect(gameboard.placeShip([4, 0], "horizontal", ship)).toBeTruthy();
    expect(gameboard.placeShip([1, 1], "vertical", otherShip)).toBeFalsy();
    expect(gameboard.board[1][1]).toBeUndefined();
  });

  test("placeShip - Not able to put ship on occupied slot Horizontal", () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    const otherShip = Ship(5);

    expect(gameboard.placeShip([0, 3], "vertical", ship)).toBeTruthy();
    expect(gameboard.placeShip([1, 1], "horizontal", otherShip)).toBeFalsy();
    expect(gameboard.board[1][1]).toBeUndefined();
  });

  test("placeShip - Place more than 1 ship", () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    const otherShip = Ship(5);

    expect(gameboard.placeShip([4, 3], "vertical", ship)).toBeTruthy();
    expect(gameboard.placeShip([1, 1], "horizontal", otherShip)).toBeTruthy();
    expect(gameboard.board[1][1]).toBe(otherShip);
    expect(gameboard.board[5][3]).toBe(ship);
  });
});

describe("Receive attacks on the board", () => {
  test("Attack on empty coordinates mark it as missed", () => {
    const gameboard = GameBoard();
    expect(gameboard.receiveAttack(0, 3)).toBeTruthy();
    expect(gameboard.board[0][3]).toBe("x");
  });

  test("Consecutive attacks on missed mark doesn't go through", () => {
    const gameboard = GameBoard();
    expect(gameboard.receiveAttack(0, 3)).toBeTruthy();
    expect(gameboard.board[0][3]).toBe("x");
    expect(gameboard.receiveAttack(0, 3)).toBeFalsy();
  });

  test("Attack on spot occupied by Ship hits the Ship", () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    gameboard.placeShip([1, 1], "vertical", ship);
    expect(gameboard.receiveAttack(2, 1)).toBeTruthy();
    expect(gameboard.board[2][1]).toBe(ship);
    expect(ship.timesHit).toBe(1);
  });

  test("Attack on already hit spot of Ship doesn't go through", () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    gameboard.placeShip([1, 1], "horizontal", ship);
    expect(gameboard.receiveAttack(1, 3)).toBeTruthy();
    expect(gameboard.receiveAttack(1, 3)).toBeFalsy();
    expect(gameboard.receiveAttack(1, 3)).toBeFalsy();
    expect(gameboard.board[1][3]).toBe(ship);
    expect(ship.timesHit).toBe(1);
  });

  test("All ships not yet sunk - no hit yet", () => {
    const gameboard = GameBoard();
    const ship2 = Ship(2);
    const ship3 = Ship(3);
    gameboard.placeShip([0,0], "horizontal", ship2);
    gameboard.placeShip([2,0], "horizontal", ship3);
    expect(gameboard.allSunk()).toBeDefined();
    expect(gameboard.allSunk()).toBeFalsy();
    });

    test("All ships not yet sunk - received some attacks", () => {
    const gameboard = GameBoard();
    const ship2 = Ship(2);
    const ship3 = Ship(3);
    gameboard.placeShip([0,0], "horizontal", ship2);
    gameboard.placeShip([2,0], "horizontal", ship3);
    gameboard.receiveAttack(0,0);
    gameboard.receiveAttack(2,0);
    expect(gameboard.allSunk()).toBeDefined();
    expect(gameboard.allSunk()).toBeFalsy();
    });

    test("All ships not yet sunk - 1/2 ship sunk", () => {
    const gameboard = GameBoard();
    const ship2 = Ship(2);
    const ship3 = Ship(3);
    gameboard.placeShip([0,0], "horizontal", ship2);
    gameboard.placeShip([2,0], "horizontal", ship3);
    gameboard.receiveAttack(0,0);
    gameboard.receiveAttack(0,1); 
    expect(ship2.isSunk()).toBeTruthy(); 
    gameboard.receiveAttack(2,0);
    expect(ship3.isSunk()).toBeFalsy();
    expect(gameboard.allSunk()).toBeDefined();
    expect(gameboard.allSunk()).toBeFalsy();
    });

    test("All ships sunk - 2/2 ships sunk", () => {
    const gameboard = GameBoard();
    const ship2 = Ship(2);
    const ship3 = Ship(3);
    gameboard.placeShip([0,0], "horizontal", ship2);
    gameboard.placeShip([2,0], "horizontal", ship3);
    gameboard.receiveAttack(0,0);
    gameboard.receiveAttack(0,1); 
    expect(ship2.isSunk()).toBeTruthy(); 
    gameboard.receiveAttack(2,0);
    gameboard.receiveAttack(2,1);
    gameboard.receiveAttack(2,2);
    expect(ship3.isSunk()).toBeTruthy();
    expect(gameboard.allSunk()).toBeDefined();
    expect(gameboard.allSunk()).toBeTruthy();
    });
});

describe("Testing Gameflow controller", () => {
  test("Right coordinates are returned - available", () => {
    const gameboard = GameBoard();
    const player = Player("Player_1", "real", gameboard);
    expect(gameboard.board[2].length).toBe(10);
    expect(player.gameboard.board[2].length).toBe(10);
    expect(player.gameboard.board).toBe(gameboard.board);
    gameboard.receiveAttack(2,0);
    gameboard.receiveAttack(2,1);
    gameboard.receiveAttack(2,2);
    console.log(player.getAvailableCoordinates());
    //Received 3 attacks, so available should be 100 - 3
    expect(player.getAvailableCoordinates().length).toBe(97);
    expect(player.getAvailableCoordinates().some(xy => xy.join("") == "20")).toBeFalsy();
    expect(player.getAvailableCoordinates().some(xy => xy.join("") == "23")).toBeTruthy();
  })
});