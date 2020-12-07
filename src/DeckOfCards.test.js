import { DeckOfCards, DeckOfCardsIterator } from './DeckOfCards';


test('Can construct a default DeckOfCards', () => {
  const d = new DeckOfCards();
  expect(d).toBeDefined();
})

test('Can construct a DeckOfCards with 2 jokers', () => {
  const d = new DeckOfCards(2);
  expect(d).toBeDefined();
})

test('A default DeckOfCards has an array with 52 Cards', () => {
  const d = new DeckOfCards();
  expect(d.deck.length === 52).toBeTruthy()
})

test('A default DeckOfCards has a size method', () => {
  const d = new DeckOfCards();
  expect(d.size === 52).toBeTruthy()
})

test('Getting a card pre-shuffle returns a card we know', () => {
  const d = new DeckOfCards();
  const aCard = d.get(3)
  // Should be 4 of Spade
  expect(aCard.rank === 4).toBeTruthy()
  expect(aCard.suite === '♠︎').toBeTruthy()
})

test('Shuffling a deck moves cards around', () => {
  const d = new DeckOfCards();
  const aCard = d.get(0)
  d.shuffle()
  const bCard = d.get(0)
  expect ( aCard.suite !== bCard.suite 
    || aCard.rank !== bCard.rank
    || aCard.suite === "" && bCard.suite==="").toBeTruthy()
})

test('Dealing off the top of unshuffled deck should return known card', () => {
  const d = new DeckOfCards();
  const aCard = d.dealOffTop()[0];
  expect( aCard.suite === '♦︎' && aCard.rank === 13).toBeTruthy()
})

test('Dealing off the top of unshuffled deck continuously', () => {
  const d = new DeckOfCards();
  d.dealOffTop(3)
  const aCard = d.dealOffTop()[0];
  expect( aCard.suite === '♦︎' && aCard.rank === 10).toBeTruthy()
  const batch = d.dealOffTop(10)
  expect( batch[9].suite === '♣︎' && batch[9].rank === 13).toBeTruthy()
  expect( batch[0].suite === '♦︎' && batch[0].rank === 9).toBeTruthy()
})

test('Dealing off the top doesnt break if out of cards', () => {
  const d = new DeckOfCards();
  const batch = d.dealOffTop(100);
  expect( batch[0].suite === '♦︎' && batch[0].rank === 13).toBeTruthy()
  expect( batch[51].suite === '♠︎' && batch[51].rank === 1).toBeTruthy()
})

test('Iterator class goes through all cards', () => {
  const d = new DeckOfCards();
  const resultArray = []

  for (let card of d ) {
    resultArray.push(card)
  }
  expect( resultArray.length === 52 ).toBeTruthy()
})