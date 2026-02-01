const coordinatesHelper = () => {
  const allCoordinates = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      allCoordinates.push([y,x]);
    }
  }

  const available = (usedCoordinates) => {
    return allCoordinates
    .filter(yx => !usedCoordinates
    .some(usedYX => {
      return usedYX.join("") === yx.join("")
    }));
  }

  const random = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  return {
    available,
    random
  }
}

export { coordinatesHelper };