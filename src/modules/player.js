import { coordinatesHelper } from "./coordinatesHelper.js";

function Player(name, gameboard, type = "real") {
  const coordinates = coordinatesHelper();

  const getAvailableCoordinates = (attackedCoordinates) => {
    return coordinates.available(attackedCoordinates);
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
    coordinates,
  };
}

function ComputerPlayer(name, gameboard, type = "computer") {
  const player = Player(name, gameboard, type);

  const computeCoordinates = (attackedCoordinates) => {
    const availableCoordinates = player.getAvailableCoordinates(attackedCoordinates);
    return player.coordinates.random(availableCoordinates);
  }
  
  return Object.assign({
    computeCoordinates,
  }, player);
}

export { Player, ComputerPlayer };
