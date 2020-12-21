import * as React from "react";
import { useState } from "react";

function GameStats({ state, children }) {
  const {
    gameStage,
    usersCardsInPlay,
    opponentsCardsInPlay,
    usersUnplayedCards,
    opponentsUnplayedCards,
  } = state;
  const [lastWin, setLastWin] = useState("");
  let winCheckUser;
  let winCheckOpp;

  if (gameStage < 1) return null;

  // Starting round 2, reset lastWin before we get to stage 3 again
  if (gameStage === 2 && lastWin !== "") {
    setLastWin("");
  }

  if (gameStage === 3) {
    winCheckUser = usersCardsInPlay[0].rank > opponentsCardsInPlay[0].rank;
    winCheckOpp = usersCardsInPlay[0].rank < opponentsCardsInPlay[0].rank;
    if (winCheckUser && lastWin === "") setLastWin("User");
    else if (winCheckOpp && lastWin === "") setLastWin("Opponent");
  }

  const kids = React.Children.map(children, (child) =>
    React.cloneElement(child, { state, lastWin })
  );

  return (
    <div className="gameStats">
      <p>
        ➾ YOUR stack:<strong>{usersUnplayedCards.length}</strong>
      </p>
      <div className="statsMiddle">{kids}</div>
      <p>
        ➾ OPPONENTS stack:<strong>{opponentsUnplayedCards.length}</strong>
      </p>
    </div>
  );
}


/* All those conditionals in the render method got refactored out and 
    put in these nicely named compound components... 
  */

GameStats.UsersTurnMessage = function ({ state, children }) {
  if (state.gameStage !== 2) return null;
  return children;
};

// No children for this one
GameStats.ShowWhoWon = function ({ state, lastWin }) {
  if (state.gameStage !== 4) return null;
  if (lastWin !== "") {
    return <h3>✩ {lastWin} won that round ✩</h3>;
  }
  return null;
};

GameStats.TieGameMessage = function ({ state, lastWin, children }) {
  if (state.gameStage !== 4) return null;
  if (lastWin === "") {
    return children;
  }
  return null;
};

GameStats.UserWonMessage = function ({ state, children }) {
  if (state.gameStage !== 5) return null;
  if (state.opponentsUnplayedCards.length < 1) {
    return children;
  }
  return null;
};

GameStats.OpponentWonMessage = function ({ state, children }) {
  if (state.gameStage !== 5) return null;
  if (state.usersUnplayedCards.length < 1) {
    return children;
  }
  return null;
};

export default GameStats;
