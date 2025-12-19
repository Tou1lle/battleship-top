function Player(name, type, gameboard) {
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
  };
}

export { Player };
