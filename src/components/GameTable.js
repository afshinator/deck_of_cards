import GameStats from "./GameStats";
import Player from "./Player";
import VisiblePlayingCard from "./VisiblePlayingCard";
import FaceDownStack from "./FaceDownStack";
import { ANIM_IN_LEFT } from "../constants";
import { useContext } from "react";
import { GameContext } from "./GameOfLuck";



function GameTable({ state, children, ...rest }) {
  
  const userDeckClickHandler = function (e) {
    // if (e.shiftKey) logOutState()
    // if (state.gameStage === 2) {
    //   dispatch({ type: "PLAY_TOP_CARD", data: "user" });
    // }
  };

  return (
    <div className="gameTable" role="main">
      {children}
      {/* <GameStats state={state} /> */}

      {/* <Player who="user" state={state} clickHandler={userDeckClickHandler} />
      <Player who="opponent" state={state} /> */}
    </div>
  );
}

GameTable.Dealer = function Dealer({ children, clickHandler, ...rest }) {
  const state = useContext(GameContext)
  console.log('.dealer ', state)
  if ( state.gameStage === "GAME_IN_PROGRESS") return null
  return (
    <section className="dealer">
      <FaceDownStack clickHandler={clickHandler} animClass={ANIM_IN_LEFT} />
    </section>
  );
};

export default GameTable;
