import GameStats from "./GameStats";
import Dealer from "./Dealer";
import Player from "./Player";

/* I think refactoring to compound components is a win here for 
  GameStats.

  With the compound component interface to GameStats, the consumer
   of the component, namely this GameTable here, gains a lot more 
   flexibility; it doesn't care about the gamestage, it  just uses
   the right function and customizes the message as need be.  I like
   this!

  Player's refactor doesn't seem to buy much except the code in 
  Player.js feels cleaner.  Maybe this refactor was too needless.
  Or maybe this is a good setup for future feature additions?
*/

function GameTable({ state, dealerDeckClickHandler, userDeckClickHandler }) {
  return (
    <div className="gameTable" role="main">
      <GameStats state={state}>
        <GameStats.UsersTurnMessage>
          <h3>➾ Your turn </h3>
        </GameStats.UsersTurnMessage>
        <GameStats.ShowWhoWon />
        <GameStats.TieGameMessage>
          <h3>✩ Same card! Random winner! ✩</h3>
        </GameStats.TieGameMessage>
        <GameStats.UserWonMessage>
          <h3>✩✩ User won game!</h3>
        </GameStats.UserWonMessage>
        <GameStats.OpponentWonMessage>
          <h3>✩✩ Opponent won game!</h3>
        </GameStats.OpponentWonMessage>
      </GameStats>
      <Dealer
        gameStage={state.gameStage}
        dealerDeckClickHandler={dealerDeckClickHandler}
      />
      <Player who="user" state={state} clickHandler={userDeckClickHandler}>
        <Player.CardsInPlay />
        <Player.UnplayedCards />
      </Player>
      <Player who="opponent" state={state}>
        <Player.CardsInPlay />
        <Player.UnplayedCards />
      </Player>
    </div>
  );
}

export default GameTable;
