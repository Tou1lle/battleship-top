import { coordinatesHelper } from "./coordinatesHelper.js";

const player = Symbol("player");

const isPlayer = (obj) => obj[player];

function Player(name, gameboard, type = "real") {
  const coordinates = coordinatesHelper();

  const getAvailableCoordinates = (attackedCoordinates) => {
    return coordinates.available(attackedCoordinates);
  }

  return {
    [player]: true,
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

export { Player, ComputerPlayer, isPlayer };
