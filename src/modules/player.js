import { coordinatesHelper } from "./coordinatesHelper.js";

function Player(name, gameboard, type = "real") {

  const getAvailableCoordinates = (attackedCoordinates) => {
    return coordinatesHelper().available(attackedCoordinates);
  }

  return {
    get name() {
      return name;
    },
    get type() {
      return type;
    },
    get gameboard() {
      return gameboard;
    },
    getAvailableCoordinates,
  };
}

function ComputerPlayer(name, gameboard, type = "computer") {
  const player = Player(name, gameboard, type);

  const computeCoordinates = (attackedCoordinates) => {
    const availableCoordinates = player.getAvailableCoordinates(attackedCoordinates);
    return coordinatesHelper().random(availableCoordinates);
  }
  
  return Object.assign({
    computeCoordinates,
  }, player);
}

export { Player, ComputerPlayer };
