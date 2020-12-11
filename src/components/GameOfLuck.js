import { ErrorBoundary } from "react-error-boundary";
// import InformUser from "./InformUser";
// import { USER_MESSAGES } from "../constants";
import GameTable from "./GameTable";
import ErrorFallback from "./ErrorFallback";
import { useLuckGameState } from "./useLuckGameState";
import { createContext } from "react";

const INITIAL_STATE = {
  gameStage: "PRE_INIT",
};

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

const GameContext = createContext(INITIAL_STATE);

function GameOfLuck() {
  const [gameState, gsDispatch] = useLuckGameState(INITIAL_STATE);

  const dealerDeckClickHandler = function () {
    if (gameState.gameStage === "READY_TO_START")
      gsDispatch({ type: "GAME_IN_PROGRESS" });
  };

  // console.log("gameStage ", gameState.gameStage);
  return (
    <div className="gameOfLuck">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <GameContext.Provider value={gameState}>
          <GameTable gameState={gameState}>
            <GameTable.Dealer clickHandler={dealerDeckClickHandler} />
          </GameTable>

          <Credits />
        </GameContext.Provider>
      </ErrorBoundary>
    </div>
  );
}

export default GameOfLuck;
export { GameContext }