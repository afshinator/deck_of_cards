import GameStats from "./GameStats";
import Dealer from "./Dealer";
import Player from "./Player";

function GameTable({
  state,
  dispatch,
  dealerDeckClickHandler,
  userDeckClickHandler,
}) {
  return (
    <div className="gameTable" role="main">
      <GameStats state={state} />
      <Dealer
        gameStage={state.gameStage}
        dealerDeckClickHandler={dealerDeckClickHandler}
      />
      <Player who="user" state={state} clickHandler={userDeckClickHandler} />
      <Player who="opponent" state={state} />
    </div>
  );
}

export default GameTable;
