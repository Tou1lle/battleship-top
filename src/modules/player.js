function Player(name, type, gameboard) {
  const usedCoordinates = gameboard.attackedCoordinates;
  const allCoordinates = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      allCoordinates.push([y,x]);
    }
  }

  const getAvailableCoordinates = () => {
    return allCoordinates
    .filter(yx => !usedCoordinates
    .some(usedYX => {
      return usedYX.join("") === yx.join("")
    }));
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

function ComputerPlayer(name, type, gameboard) {
  const player = Player(name, type, gameboard);
  
  return Object.assign({}, player);
}

export { Player, ComputerPlayer };
