import GameStats from "./GameStats";
import Dealer from "./Dealer";

function GameTable({ state, dispatch }) {
  const dealerDeckClickHandler = function () {
    if (state.gameStage === 0) {
      dispatch({ type: "START_GAME" });
    }
  };
  const userDeckClickHandler = function () {
    if (state.gameStage === 2) {
      dispatch({ type: "PLAY_TOP_CARD", data: "user" });
    }
  };

  return (
    <div className="gameTable">
      <GameStats state={state} />
      <Dealer
        gameStage={state.gameStage}
        dealerDeckClickHandler={dealerDeckClickHandler}
      />
    </div>
  );
}

export default GameTable;
