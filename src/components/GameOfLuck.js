import { ErrorBoundary } from "react-error-boundary";
// import useGameState from "./useGameState";
import InformUser from "./InformUser";
import { USER_MESSAGES } from "../constants";
import GameTable from "./GameTable";

import { useState, useEffect, useReducer } from "react";
import { DeckOfCards } from "../DeckOfCards";
import { simpleDeepCopy } from "../utils";

import useGameState from "./useGameState"

function ErrorFallback({ error }) {
  return (
    <div>
      <p>
        In case of application crash, show this spiffy component as a fallback
        instead of broken screen.
      </p>
      {/* <pre>{error.message}</pre> */}
    </div>
  );
}

const INITIAL_STATE = {
  gameStage: 0, // will help synchronize state with stages in game
  usersUnplayedCards: [],
  usersCardsInPlay: [],
  usersWins: [],
  opponentsUnplayedCards: [],
  opponentsCardsInPlay: [],
  opponentsWins: [],
  warAlert: false, // true to trigger some visual effects
};


function GameOfLuck() {
  const [deck] = useState(() => {
    return new DeckOfCards();
  });
  const [state, dispatch] = useGameState();

  useEffect(() => {
    deck.shuffle();
  }, [deck, dispatch]);

  const dealerDeckClickHandler = function () {
    if (state.gameStage === 0) {
      dispatch({ type: "DEAL_TO_USER", data: deck.dealOffTop(3) });
      dispatch({ type: "DEAL_TO_OPPONENT", data: deck.dealOffTop(3) });
      dispatch({ type: "START_GAME" });
    }
  };

  const userDeckClickHandler = function () {
    if (state.gameStage === 2) {
      dispatch({ type: "PLAY_TOP_CARD", data: "user" });
    }
  };

  console.log("GameOfLuck rendering ", simpleDeepCopy(state));
  
  return (
    <div className="gameOfLuck">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <InformUser>{USER_MESSAGES[state.gameStage]}</InformUser>
        <GameTable
          state={state}
          dispatch={dispatch}
          dealerDeckClickHandler={dealerDeckClickHandler}
          userDeckClickHandler={userDeckClickHandler}
        />
      </ErrorBoundary>
    </div>
  );
}

export default GameOfLuck;
