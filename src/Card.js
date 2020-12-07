class Card {
  constructor(suite, rank, jokerId = "", facing = "down") {
    this.suite = suite; // "" indicates a joker
    if (suite === "") this.jokerId = jokerId; // to identify b/w jokers if need be

    this.rank = rank;
    this.facing = facing;
  }

  faceUp() {
    this.facing = "up";
  }
  faceDown() {
    this.facing = "down";
  }
  get() {
    return { ...this };
  }
  getClone() {
    return new Card(this.suite, this.ranking, this.jokerId || "", this.facing);
  }
}



export { Card };
