import { Card } from "./Card.js";
import { SUITES, RANKS_PER_SUITE } from "./constants.js";
import { simpleDeepCopy } from "./utils.js";

/*  DeckOfCards represents a standard stack of playing cards, stacked
    so that you serve off the top.  
    You can pass in how many jokers you want in the deck, if any.
    You can
      - shuffle the deck (randomize the order of cards in stack),
      - serve x number of cards off the top (get Card copies),
      - get a count of the number of cards in a stack
      - get where the top of the stack is so to figure out what has been served,
        and what has not.
      - shuffle also to reset the deck and put it no cards-yet-dealt state
  */
class DeckOfCards {
  /* Create an ordered deck of cards, with jokers at the bottom (if any)*/
  constructor(jokers = 0) {
    this.jokers = jokers; // how many jokers in the deck?
    this.deck = []; // array of cards
    this.top = null; /* Index of the current top of the card stack,
                        every card after it in deck has been dealt. */

    // For each suite, go through all the ranks, then we'll add jokers if any
    let suite, rank;
    for (suite = 0; suite < SUITES.length; suite++) {
      for (rank = 1; rank <= RANKS_PER_SUITE; rank++) {
        this.deck.push(new Card(SUITES[suite], rank));
      }
    }

    let jokerCount = jokers > 3 ? 3 : jokers; // Realistic cap off on jokers

    while (jokerCount--) {
      this.deck.push(new Card("", jokerCount + 1, jokerCount + 1));
    }

    this.top = this.deck.length - 1;
  }

  get(index) {
    return this.deck[index];
  }

  get size() {
    return this.deck.length;
  }

  get topIndex() {
    return this.top;
  }

  /* Shuffle the deck randomly, also used to re-initialize */
  shuffle() {
    var i = this.deck.length,
      temp,
      randomIndex;

    while (0 !== i) {
      randomIndex = Math.floor(Math.random() * i);
      i--;
      temp = this.deck[i];
      this.deck[i] = this.deck[randomIndex];
      this.deck[randomIndex] = temp;
    }

    this.top = this.deck.length - 1;
  }

  /* Deal cards off the 'top' of the deck; pass in how many
    Returns an array of copies of cards 'dealt'
  */
  dealOffTop(howManyWanted = 1) {
    if (this.top < 0) {
      return [];
    }
    const howManyAvailable = this.top + 1;
    const howManyReally =
      howManyWanted > howManyAvailable ? howManyAvailable : howManyWanted;

    const start = this.top - howManyReally + 1;
    if (this.top - howManyReally < 0) this.top = null;
    else this.top = this.top - howManyReally;

    return simpleDeepCopy(
      this.deck.slice(start, start + howManyReally)
    ).reverse();
  }
}

// Set up the DeckOfCards class to be iterable
DeckOfCards.prototype[Symbol.iterator] = function () {
  return new DeckOfCardsIterator(this);
};

class DeckOfCardsIterator {
  constructor(deckOfCards) {
    this.deckOfCards = deckOfCards;
    this.current = deckOfCards.topIndex;
  }

  next() {
    const { current, deckOfCards } = this;

    if (current < 0) {
      return { done: true };
    }

    let value = deckOfCards.get(current); // get Card at this index
    this.current = this.current - 1; // modify value for iterator

    return { value, done: false };
  }
}

export { DeckOfCards, DeckOfCardsIterator };
