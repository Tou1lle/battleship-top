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

  const renderBoardShown = (player, boardUI) => {
    player.gameboard.board.forEach((row, indexY) => {
      row.forEach((cell, indexX) => {
        const div = document.createElement("div");
        const occupant = !cell ? "empty" : cell === "x" ? "missed-shot" : "ship";
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