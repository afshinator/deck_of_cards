import { Component } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useGameState from "./useGameState";
import InformUser from "./InformUser";
import { USER_MESSAGES } from "../constants";
import GameTable from './GameTable';


function ErrorFallback({ error }) {
  return (
    <div>
      <p>Something went terribly wrong!</p>
      {/* <pre>{error.message}</pre> */}
    </div>
  );
}

function GameOfLuck() {
  const [state, dispatch] = useGameState();

  return (
    <div className="gameOfLuck">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <InformUser>{USER_MESSAGES[state.gameStage]}</InformUser>
        <GameTable state={state} dispatch={dispatch} />
      </ErrorBoundary>
    </div>
  );
}

export default GameOfLuck;
