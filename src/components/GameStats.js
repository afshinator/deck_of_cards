import { useState } from "react";

function GameStats({state}) {
  const {
    gameStage,
    usersCardsInPlay,
    opponentsCardsInPlay,
    usersUnplayedCards,
    opponentsUnplayedCards,
    usersWins,
    opponentsWins,
  } = state;
  const [lastWin, setLastWin] = useState('')
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

  if ( gameStage === 5) {
    winCheckOpp = usersUnplayedCards.length + usersWins.length < 1
    winCheckUser = opponentsUnplayedCards.length + opponentsWins.length < 1
  }
  return (
    <div className="gameStats">
      <p>
        ➾ YOUR stack:<strong>{usersUnplayedCards.length}</strong>, wins:{" "}
        {usersWins.length}
      </p>
      <div className="statsMiddle">
        {gameStage === 2 ? <h3>➾Click on your card ☞</h3> : null}
        {gameStage === 4 ? <h3>✩ {lastWin} Won that round ✩</h3> : null}
        {gameStage === 5 
        ? 
        <h3>✩✩ { winCheckOpp ? 'Opponent Won!' : 'User Won!'} ✩✩</h3> 
        : null }
      </div>
      <p>
        ➾ OPPONENTS stack:<strong>{opponentsUnplayedCards.length}</strong>,
        wins: {opponentsWins.length}
      </p>
    </div>
  );
}

export default GameStats;