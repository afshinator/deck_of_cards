import { ErrorBoundary } from "react-error-boundary";
import InformUser from "./InformUser";
import { USER_MESSAGES } from "../constants";
import GameTable from "./GameTable";
import { useState, useEffect } from "react";
import { DeckOfCards } from "../DeckOfCards";
import useGameState from "./useGameState";
import ErrorFallback from "./ErrorFallback";

const CARDS_PER_PLAYER = 4;

function Credits() {
  return (
    <footer>
      by{" "}
      <a href="https://afshin.me" rel="noreferrer" target="_blank">
        Afshin Mokhtari
      </a>
    </footer>
  );
}

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
      dispatch({
        type: "DEAL_TO_USER",
        data: deck.dealOffTop(CARDS_PER_PLAYER),
      });
      dispatch({
        type: "DEAL_TO_OPPONENT",
        data: deck.dealOffTop(CARDS_PER_PLAYER),
      });
      dispatch({ type: "START_GAME" });
    }
  };

  const userDeckClickHandler = function () {
    if (state.gameStage === 2) {
      dispatch({ type: "PLAY_TOP_CARD", data: "user" });
    }
  };

  return (
    <div className="gameOfLuck">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <InformUser>{USER_MESSAGES[state.gameStage]}</InformUser>
        <GameTable
          state={state}
          dealerDeckClickHandler={dealerDeckClickHandler}
          userDeckClickHandler={userDeckClickHandler}
        />
        <Credits />
      </ErrorBoundary>
    </div>
  );
}

export default GameOfLuck;
