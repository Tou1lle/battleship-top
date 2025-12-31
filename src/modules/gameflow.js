import { Ship } from "./ship.js";
import { GameBoard } from "./gameboard.js";
import { Player, ComputerPlayer } from "./player.js";

function Gameflow() {
  const playerShips = Array.from(document.querySelectorAll(".player-ships-container"));
  const playerGameboards = Array.from(document.querySelectorAll(".player-gameboard"));
  const gameboard1 = GameBoard();
  const gameboard2 = GameBoard();
  const player1 = Player("Player_1", gameboard1);
  const player2 = ComputerPlayer("Player_2_PC", gameboard2);
  const players = [player1, player2];

  player1.gameboard.placeShip([0,0], "horizontal", Ship(2));
  player1.gameboard.placeShip([1,0], "horizontal", Ship(3));
  player1.gameboard.placeShip([2,0], "horizontal", Ship(3));
  player1.gameboard.placeShip([3,0], "horizontal", Ship(4));
  player1.gameboard.placeShip([4,0], "horizontal", Ship(5));

  player1.gameboard.receiveAttack(5,0);
  player1.gameboard.receiveAttack(0,0);
  player1.gameboard.receiveAttack(9,9);

  const clearBoard = (boardUI) => {
    boardUI.textContent = "";
  }  

  const renderBoardShown = (player, boardUI) => {
    clearBoard(boardUI);
    player.gameboard.board.forEach((row, indexY) => {
      row.forEach((collumn, indexX) => {
        const div = document.createElement("div");
        const occupant = !collumn ? "empty" : collumn === "x" ? "missed-shot" : "ship";
        const hitShip = player.gameboard.attackedCoordinates.some(xy => xy.join("") === `${indexY}${indexX}`)
                        ? true : false;
        if (hitShip) div.classList.add("hit");
        div.classList.add(occupant);
        div.classList.add("cell");
        div.classList.add("show");
        div.dataset.y = indexY;
        div.dataset.x = indexX;
        boardUI.appendChild(div);
      })
    });
  }

  renderBoardShown(player1, playerGameboards[0]);
}

export { Gameflow };