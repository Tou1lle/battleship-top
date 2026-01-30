function Player(name, gameboard, type = "real") {
  const allCoordinates = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      allCoordinates.push([y,x]);
    }
  }

  const getAvailableCoordinates = (attackedCoordinates) => {
    return allCoordinates
    .filter(yx => !attackedCoordinates
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

function ComputerPlayer(name, gameboard, type = "computer") {
  const player = Player(name, gameboard, type);

  const computeCoordinates = (attackedCoordinates) => {
    const availableCoordinates = player.getAvailableCoordinates(attackedCoordinates);
    const index = Math.floor(Math.random() * availableCoordinates.length);
    return availableCoordinates[index];
  }
  
  return Object.assign({
    computeCoordinates,
  }, player);
}

export { Player, ComputerPlayer };
