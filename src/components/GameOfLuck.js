import { ErrorBoundary } from "react-error-boundary";
import InformUser from "./InformUser";
import { USER_MESSAGES } from "../constants";
import GameTable from "./GameTable";

import ErrorFallback from "./ErrorFallback";
import { simpleDeepCopy } from "../utils";
import { useLuckGameState } from "./useLuckGameState";
import { createContext } from "react";

const CARDS_PER_PLAYER = 4;

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
    console.log("click handler cuaght");
    if (gameState.gameStage === "READY_TO_START")
      gsDispatch({ type: "GAME_IN_PROGRESS" });
  };

  console.log("gameStage ", gameState.gameStage);
  return (
    <div className="gameOfLuck">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <GameContext.Provider value={gameState}>
          <GameTable>
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