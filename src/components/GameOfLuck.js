import { Component } from "react";
import {ErrorBoundary} from 'react-error-boundary'
import useGameState from "./useGameState";

// const ErrBoundary = ReactErrorBoundary.ErrorBoundary

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
  console.log("State in Game:", state);

  return (
    <div className="gameArea">
      <ErrorBoundary FallbackComponent={ErrorFallback}>

      </ErrorBoundary>
    </div>
  );
}

export default GameOfLuck;
