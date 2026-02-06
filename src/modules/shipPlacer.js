import "./../styles/ship-placement.css";
import { renderHelper } from "./renderHelper.js";
/**
 * ShipPlacement module
 * - parameters: players
 * 
 * functions:
 * - show invalid
 * - show valid
 * - when droped and valid then place the ship and render the board
 * - when droped and invalid then return
 * 
 * when game opened (initial)
 * - open dialog
 * - run until all ships placed and user hits confirm
 */

const ShipPlacer = (player, ships, onConfirm) => {
  const placementDialog = document.querySelector(".ship-placement-container");
  const placementBoard = document.querySelector(".placement-board");
  const placementShips = document.querySelector(".placement-ships");
  const placementDirectionBtn = document.querySelector(".placement-direction-btn");
  const placementRandomBtn = document.querySelector(".placement-random-btn");
  const placementConfirmBtn = document.querySelector(".placement-confirm-btn");
  const render = renderHelper();

  const initial = () => {
    placementDialog.showModal();
    reRender();
  }

  const resetPlayer = (newPlayer) => {
    player = newPlayer;
  }

  const resetShips = (newShips) => {
    ships = newShips;
  }

  const restartPlacer = () => {
    placementDialog.showModal();
    reRender();
  }

  const toggleDirection = (e) => {
    e.target.textContent = 
    e.target.textContent.toLowerCase() 
    === "vertical" 
    ? "horizontal".toLocaleUpperCase() 
    : "vertical".toLocaleUpperCase(); 
  }

  const toggleShipsDirection = () => {
    const direction = getDirection(placementDirectionBtn);
    const shipsContainer = Array.from(document.querySelectorAll(".ship-dots-container-placement"));
    shipsContainer.forEach(ship => {
      if (direction === "vertical") {
        ship.style.flexDirection = "column"
      } else if (direction === "horizontal") {
        ship.style.flexDirection = "row"
      } else {
        console.log("Direction error");
      }
    })
  }

  const setDraggable = (ships) => {
    ships.forEach(ship => ship.setAttribute("draggable", true));
    getPlaceShips().forEach(shipDiv => {
    shipDiv.addEventListener("dragstart", dragstartHandler);
  })
  }

  const setDropable = () => {
    getCells().forEach(cell => {
    cell.addEventListener("dragover", dragoverHandler);
  })

  getCells().forEach(cell => {
    cell.addEventListener("drop", dropHandler);
  })
  }

  const getDirection = () => {
    return placementDirectionBtn.textContent.toLowerCase().trim();
  }

  const getPlaceShips = () => {
    return Array.from(document.querySelectorAll(".place-ship"));
  }

  const getCells = () => {
    return Array.from(document.querySelectorAll(".cell"));
  }

  const removePlaced = () => {
    player.gameboard.ships.forEach(ship => {
      const placeShip = getPlaceShips().find(placeShip => placeShip.dataset.id === ship.id);
      if (placeShip) placeShip.remove();
    })
  }

  const dragstartHandler = (e) => {
    console.log("i run");
    e.dataTransfer.setData("ship-id", e.currentTarget.dataset.id);
    console.log(e.currentTarget.dataset.id);
  }

  const dragoverHandler = (e) => {
    e.preventDefault();
  }

  const reRender = () => {
    placementBoard.textContent = "";
    placementShips.textContent = "";
    render.renderBoardShown(player, placementBoard);
    render.renderShips(ships, placementShips, false);
    toggleShipsDirection();
    removePlaced();
    setDraggable(getPlaceShips());
    setDropable();
  }

  const dropHandler = (e) => {
    console.log("I run")
    e.preventDefault();
    const shipId = e.dataTransfer.getData("ship-id");
    const ship = ships.find(ship => ship.id === shipId);
    console.log(shipId);
    console.log(ship);
    const coordinates = [e.currentTarget.dataset.y, e.currentTarget.dataset.x];
    if (!player.gameboard.hasEnoughSpace(coordinates, getDirection(), ship)
      || player.gameboard.occupied(coordinates, getDirection(), ship)) {
      console.log("Invalid");
      return;
    } else {
      player.gameboard.placeShip(coordinates, getDirection(), ship);
      reRender();
    }
  }

  placementDirectionBtn.addEventListener("click", (e) => {
    toggleDirection(e);
    toggleShipsDirection();
  });

  initial();
  
  getPlaceShips().forEach(shipDiv => {
    shipDiv.addEventListener("dragstart", dragstartHandler);
  })

  getCells().forEach(cell => {
    cell.addEventListener("dragover", dragoverHandler);
  })

  getCells().forEach(cell => {
    cell.addEventListener("drop", dropHandler);
  })

  placementConfirmBtn.addEventListener("click", () => {
    console.log("ships length: " + player.gameboard.ships.length);
    if (player.gameboard.ships.length != 5) return;
    placementDialog.close();
    onConfirm();
  })
  
  placementRandomBtn.addEventListener("click", () => {
    player.gameboard.placeRandomly(ships);
    console.log(player.gameboard.ships.length);
    reRender();
  })

  return {
    resetPlayer,
    resetShips,
    restartPlacer
  }
}

export { ShipPlacer };