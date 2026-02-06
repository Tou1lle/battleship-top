import { Ship } from "./ship.js";
import { GameBoard } from "./gameboard.js";
import { Player, ComputerPlayer } from "./player.js";
import { renderHelper } from "./renderHelper.js";
import { ShipPlacer } from "./shipPlacer.js";
import rightMissile from "./../assets/missile-right.svg";
import leftMissile from "./../assets/missile-left.svg";

function Gameflow() {
  const playerShipsUI = Array.from(document.querySelectorAll(".player-ships-container"));
  const playerGameboardsUI = Array.from(document.querySelectorAll(".player-gameboard"));
  const playerNamesUI = Array.from(document.querySelectorAll(".player-name"));
  const endGameDialog = document.querySelector("dialog.restart-game-container");
  const endGameButton = document.querySelector("button.endgame-button");
  const missileIcon = document.querySelector(".missile-icon > img");
  const render = renderHelper();

  let player1;
  let player2;
  let players;
  let targetedPlayer;

  const updatePage = () => {
    for (let i = 0; i < 2; i++) {
      clearBoard(playerGameboardsUI[i]);
      clearShips(playerShipsUI[i]);
      if (players[i].type === "real") {
        render.renderBoardShown(players[i], playerGameboardsUI[i]);
      } else {
        render.renderBoardShown(players[i], playerGameboardsUI[i]);
      }
      render.renderShips(players[i], playerShipsUI[i]);
    }
    render.renderNames(players, playerNamesUI);
  }

  const resetGame = () => {
    player1 = Player("Player_1", GameBoard());
    player2 = ComputerPlayer("Player_2_PC", GameBoard());
    players = [player1, player2];
    const ships1 = [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)];
    const ships2 = [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)];

    player2.gameboard.placeRandomly(ships2);
    shipPlacer.resetPlayer(player1);
    shipPlacer.resetShips(ships1);
    shipPlacer.restartPlacer();

    targetedPlayer = players[1];
  }

  const showEndDialog = () => {
    endGameDialog.showModal();
  }

  const closeEndDialog = () => {
    endGameDialog.close();
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

  const getAttackingPlayer = () => {
    return targetedPlayer === players[0] ? players[1] : players[0];
  }

  const toggleTargetedPlayer = () => {
    targetedPlayer = targetedPlayer === players[0] ? players[1] : players[0];
  }

  const getTargetedPlayer = () => {
    return targetedPlayer;
  }

  const setTargetedCell = () => {
    Array.from(playerGameboardsUI[getTargetedPlayerIndex()].querySelectorAll(".cell"))
    .forEach(cell => cell.classList.add("attack-enabled"));
  }

  const changeTurns = () => {
    toggleTargetedPlayer();
    setTargetedCell();
  }

  const checkWinningConditions = () => {
    if (getTargetedPlayer().gameboard.allSunk()) {
      console.log("The winner is " + getAttackingPlayer().name);
      showEndDialog();
      return true;
    }
  }

  const setWinningMessage = () => {
    const winnerMessage = document.querySelector(".endgame-winner");
    winnerMessage.textContent = "The winner is: " + getAttackingPlayer().name;
  }

  const playRound = (e) => {
    const clickedPlace = e.target;
    if (
      !(clickedPlace.hasAttribute("data-x") || clickedPlace.hasAttribute("data-y")) ||
      !(clickedPlace.classList.contains("attack-enabled")) ||
      !(getAttackingPlayer().type === "real") ||
      (clickedPlace.classList.contains("attack-invalid"))
    ) {
      console.log("Conditions not met for attacking!");
      return;
    };
    getTargetedPlayer().gameboard.receiveAttack(clickedPlace.dataset.y, clickedPlace.dataset.x);
    updatePage();
    if (checkWinningConditions()) {
      setWinningMessage();
      return;
    }
    changeTurns();
    missileIcon.src = leftMissile;

    if (getAttackingPlayer().type === "computer") {
      setTimeout(() => {
        const coordinates = getAttackingPlayer()
                            .computeCoordinates(getTargetedPlayer()
                            .gameboard
                            .attackedCoordinates);
        getTargetedPlayer().gameboard.receiveAttack(...coordinates);
        updatePage();
        if (checkWinningConditions()) {
          setWinningMessage();
          return;
        }
        changeTurns();
        missileIcon.src = rightMissile;
      }, 1500)
    }
  }

  playerGameboardsUI.forEach(boardUI => boardUI.addEventListener("click", playRound));
  endGameDialog.addEventListener("close", resetGame);
  endGameButton.addEventListener("click", closeEndDialog);

  //Inital creation
    player1 = Player("Player_1", GameBoard());
    player2 = ComputerPlayer("Player_2_PC", GameBoard());
    players = [player1, player2];
    const ships1 = [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)];
    const ships2 = [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)];

    player2.gameboard.placeRandomly(ships2);
    const shipPlacer = ShipPlacer(player1, ships1, () => {
      updatePage();
      setTargetedCell();
      missileIcon.src = rightMissile;
    });
    targetedPlayer = players[1];
}

export { Gameflow };