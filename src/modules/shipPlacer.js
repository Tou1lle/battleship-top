import "./../styles/ship-placement.css";
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

  const initial = () => {
    placementDialog.showModal();
  }

  //initial();
}

export { ShipPlacer };