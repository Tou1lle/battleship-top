const SHIP_NAMES = [
  "PATROAL BOAT",
  "SUBMARINE",
  "DESTROYER",
  "BATTLESHIP",
  "CARRIER"
]

const renderHelper = () => {
  const renderNames = (players, namesUI) => {
    for (let i = 0; i < namesUI.length; i++) {
      namesUI[i].textContent = players[i].name;
    }
  }

  const renderBoardShown = (player, boardUI) => {
    player.gameboard.board.forEach((row, indexY) => {
      row.forEach((collumn, indexX) => {
        const div = document.createElement("div");
        const occupant = !collumn ? "empty" : collumn === "x" ? "missed-shot" : "ship";
        const hitShip = player.gameboard.attackedCoordinates.some((
          xy => xy.join("") === `${indexY}${indexX}` && occupant === "ship"
        )) ? true : false;
        div.classList.add(occupant);
        div.classList.add("cell");
        div.classList.add("show");
        div.dataset.y = indexY;
        div.dataset.x = indexX;
        if (hitShip) div.classList.add("hit");
        if (div.classList.contains("hit") || div.classList.contains("missed-shot")) {
          div.classList.add("attack-invalid");
        }
        boardUI.appendChild(div);
      })
    });
  }

  const renderShips = (player, shipsUI) => {
    player.gameboard.ships.forEach((ship, id) => {
      const div = document.createElement("div");
      const shipNameH3 = document.createElement("h3");
      const shipLengthDots = document.createElement("div");
      for (let i = 0; i < ship.length; i++) {
        const dot = document.createElement("div");
        dot.classList.add("ship-dot");
        shipLengthDots.appendChild(dot);
      }
      shipLengthDots.classList.add("ship-dots-container");
      shipNameH3.classList.add("ship-name")
      div.classList.add("ship-item");

      shipNameH3.textContent = SHIP_NAMES[id];

      div.append(shipNameH3, shipLengthDots);
      shipsUI.appendChild(div);
      renderTimesHit(ship, shipLengthDots);
    });
  }

  const renderTimesHit = (ship, container) => {
    const timesHit = ship.timesHit;
    const dots = Array.from(container.querySelectorAll(".ship-dot"));
    for (let i = 0; i < timesHit; i++) {
      dots[i].classList.add("ship-dot-hit");
    }
  }

  return {
    renderNames,
    renderBoardShown,
    renderShips
  }
}

export { renderHelper };