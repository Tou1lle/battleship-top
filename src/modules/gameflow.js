import { Ship } from "./ship.js";
import { GameBoard } from "./gameboard.js";
import { Player, ComputerPlayer } from "./player.js";

const SHIP_NAMES = [
  "PATROAL BOAT",
  "SUBMARINE",
  "DESTROYER",
  "BATTLESHIP",
  "CARRIER"
]

function Gameflow() {
  const playerShipsUI = Array.from(document.querySelectorAll(".player-ships-container"));
  const playerGameboardsUI = Array.from(document.querySelectorAll(".player-gameboard"));
  const playerNamesUI = Array.from(document.querySelectorAll(".player-name"));

  const player1 = Player("Player_1", GameBoard());
  const player2 = ComputerPlayer("Player_2_PC", GameBoard());
  const players = [player1, player2];
  let targetedPlayer = players[1];

  console.log(player1);
  console.log(player2);

  player1.gameboard.placeShip([0,0], "horizontal", Ship(2));
  player1.gameboard.placeShip([1,0], "horizontal", Ship(3));
  player1.gameboard.placeShip([2,0], "horizontal", Ship(3));
  player1.gameboard.placeShip([3,0], "horizontal", Ship(4));
  player1.gameboard.placeShip([4,0], "horizontal", Ship(5));

  player1.gameboard.receiveAttack(5,0);
  player1.gameboard.receiveAttack(0,0);
  player1.gameboard.receiveAttack(9,9);
  player1.gameboard.receiveAttack(2,2);

  player2.gameboard.placeShip([0,0], "horizontal", Ship(2));
  player2.gameboard.placeShip([1,0], "horizontal", Ship(3));
  player2.gameboard.placeShip([2,0], "horizontal", Ship(3));
  player2.gameboard.placeShip([3,0], "horizontal", Ship(4));
  player2.gameboard.placeShip([4,0], "horizontal", Ship(5));

  const updatePage = () => {
    renderBoardShown(players[0], playerGameboardsUI[0]);
    renderBoardShown(players[1], playerGameboardsUI[1])
    renderNames(players, playerNamesUI);
    renderShips(players[0], playerShipsUI[0]);
    renderShips(players[1], playerShipsUI[1]);
  }

  const clearBoard = (boardUI) => {
    boardUI.textContent = "";
  }

  const clearShips = (shipsUI) => {
    shipsUI.textContent = "";
  }

  const getTargetedPlayerIndex = () => {
    return players.findIndex(player => player === targetedPlayer);
  }

  const getOnTurnPlayer = () => {
    return targetedPlayer === players[0] ? players[1] : players[0];
  }

  const changeTargetedTurn = () => {
    targetedPlayer = targetedPlayer === players[0] ? players[1] : players[0];
  }

  const renderNames = (players, namesUI) => {
    for (let i = 0; i < namesUI.length; i++) {
      namesUI[i].textContent = players[i].name;
    }
  }

  const renderBoardShown = (player, boardUI) => {
    clearBoard(boardUI);
    player.gameboard.board.forEach((row, indexY) => {
      row.forEach((collumn, indexX) => {
        const div = document.createElement("div");
        const occupant = !collumn ? "empty" : collumn === "x" ? "missed-shot" : "ship";
        const hitShip = player.gameboard.attackedCoordinates.some((
          xy => xy.join("") === `${indexY}${indexX}` && occupant === "ship"
        )) ? true : false;
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

  const renderShips = (player, shipsUI) => {
    clearShips(shipsUI);
    player.gameboard.ships.forEach((ship, id) => {
      const div = document.createElement("div");
      const shipNameH3 = document.createElement("h3");
      const shipLengthDots = document.createElement("div");
      for (let i = 0; i < ship.length; i++) {
        const dot = document.createElement("div");
        dot.classList.add("ship-dot");
        shipLengthDots.appendChild(dot);
      }
      shipLengthDots.classList.add("ship-dots-container");
      shipNameH3.classList.add("ship-name")
      div.classList.add("ship-item");

      shipNameH3.textContent = SHIP_NAMES[id];

      div.append(shipNameH3, shipLengthDots);
      shipsUI.appendChild(div);
      renderTimesHit(ship, shipLengthDots);
    });
  }

  const renderTimesHit = (ship, container) => {
    const timesHit = ship.timesHit;
    const dots = Array.from(container.querySelectorAll(".ship-dot"));
    for (let i = 0; i < timesHit; i++) {
      dots[i].classList.add("ship-dot-hit");
    }
  }

  const playRound = (e) => {
    console.log(e.target);
  }

  updatePage();
}

export { Gameflow };