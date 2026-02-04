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
  }

  const toggleDirection = (e) => {
    e.target.textContent = 
    e.target.textContent.toLowerCase() 
    === "vertical" 
    ? "horizontal".toLocaleUpperCase() 
    : "vertical".toLocaleUpperCase(); 
  }

  const getDirection = (directionNode) => {
    return directionNode.textContent.toLowerCase();
  }

  placementDirectionBtn.addEventListener("click", toggleDirection);

  initial();
}

export { ShipPlacer };