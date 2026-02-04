/**
 * Ship represents a piece in Battleship boardgame
 * @param {number} length - length of the Ship according to rules (2, 3, 3, 4, 5)
 */
function Ship(length) {
  let timesHit = 0;
  const id = crypto.randomUUID();

  const hit = () => timesHit++;
  const isSunk = () => timesHit >= length;

  return {
    get timesHit() {
      return timesHit;
    },
    get length() {
      return length;
    },
    get id() {
      return id;
    },
    hit,
    isSunk,
  };
}

export { Ship };
