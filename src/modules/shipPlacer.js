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

const ShipPlacer = (player, ships) => {
  const placementDialog = document.querySelector(".ship-placement-container");
  const placementBoard = document.querySelector(".placement-board");
  const placementShips = document.querySelector(".placement-ships");
  const placementDirectionBtn = document.querySelector(".placement-direction-btn");
  const render = renderHelper();

  const initial = () => {
    placementDialog.showModal();
    render.renderBoardShown(player, placementBoard);
    render.renderShips(ships, placementShips, false);
    setDraggable(getPlaceShips());
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
  }

  const getDirection = (directionNode) => {
    return directionNode.textContent.toLowerCase();
  }

  const getPlaceShips = () => {
    return Array.from(document.querySelectorAll(".place-ship"));
  }

  const getCells = () => {
    return Array.from(document.querySelectorAll(".cell"));
  }

  const dragstartHandler = (e) => {
    console.log("i run");
    e.dataTransfer.setData("ship-id", e.currentTarget.dataset.id);
  }

  const dragoverHandler = (e) => {
    e.preventDefault();
  }

  const dropHandler = (e) => {
    console.log("I run")
    e.preventDefault();
    const shipId = e.dataTransfer.getData("ship-id")
    console.log(shipId);
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
}

export { ShipPlacer };