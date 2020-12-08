# DeckOfCards class, and a simple game in the browser...

The DeckOfCards class lives in the /src directory; there are also some tests.

The game is simple, and its a game of chance, as a React-JS app.

A few shuffled cards are divided between the two players, you and an opponent.  You both reveal the top card of your stack, and high card gets both cards added to their stack.  You win when the other person runs out of cards.



### Available Scripts

In the project directory, you can run all the usual CRA scripts, but of special note:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn test`

Launches the test runner.  **I've added some tests for DeckOfCards**


## Design decisions

* Create React App; just because it is known, provides a nice baseline

* I wanted some high impact animation; I got the most for the buck by using css from anime.css; I didn't install the component, just to keep the project essentialy dependency-free.

* I haven't played with 'classes' in Javascript since before they added that keyword to the language! It was interesting learning about the new syntax and how it works, the iterator, etc... 

* Even though the game exercises the DeckOfCards, the tests are a better test.

* State management: given the small size of the app, what React provides is plenty. Most of the logic of the app is a custom hook inside src/components/useGameState.js.

