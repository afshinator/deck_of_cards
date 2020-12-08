import { useEffect, useReducer } from "react";
import { DeckOfCards } from "../DeckOfCards";
import { simpleDeepCopy } from "../utils";

const INITIAL_STATE = {
  gameStage: 0, // will help synchronize state with stages in game
  usersUnplayedCards: [],
  usersCardsInPlay: [],
  usersWins: [],
  opponentsUnplayedCards: [],
  opponentsCardsInPlay: [],
  opponentsWins: [],
  warAlert: false, // true to trigger some visual effects
};

function useGameState(initialState = INITIAL_STATE) {
  const reducer = (state, action) => {
    const newState = simpleDeepCopy(state);
    let temp = null;

    function playTop(who, faceUp = false) {
      const unplayed = newState[`${who}sUnplayedCards`];
      const wins = newState[`${who}sWins`];
      const inPlay = newState[`${who}sCardsInPlay`];

      // replenish from wins if unplayed stack is almost empty
      if (unplayed.length < 2 && wins.length > 0) {
        while (wins.length > 0) {
          unplayed.unshift(wins.pop());
        }
      }
      if (unplayed.length < 1) {
        // this player ran out of cards
        console.log("THIS PLAYER LOST: ", who);
        return false;
      } else {
        const card = unplayed.pop();
        inPlay.push(card);
        if (faceUp) inPlay[inPlay.length - 1].facing = "up";
        return true;
      }
    }

    switch (action.type) {
      case "DEAL_TO_OPPONENT": // Stage 0
        newState.opponentsUnplayedCards = action.data;
        return newState;

      case "DEAL_TO_USER": // Stage 0
        newState.usersUnplayedCards = action.data;
        return newState;

      case "START_GAME": // Stage 0
        newState.gameStage++;
        return newState;

      case "PLAY_TOP_CARD":
        if (playTop(action.data, true)) {
          newState.gameStage++;
        } else {
          newState.gameStage = 5;
        }
        return newState;

      case "ROUND_WIN":
        console.log("-->ROUND_WIN");
        // Favors the opponent, but then opponent draws first and can run out first
        temp =
          newState.usersCardsInPlay[0].rank <
          newState.opponentsCardsInPlay[0].rank
            ? newState.opponentsWins
            : newState.usersWins;
        while (newState.usersCardsInPlay.length) {
          temp.push(newState.usersCardsInPlay.pop());
        }
        while (newState.opponentsCardsInPlay.length) {
          temp.push(newState.opponentsCardsInPlay.pop());
        }
        newState.gameStage++;
        return newState;

      case "ADVANCE_ROUND":
        console.log("-->ADVANCE_ROUND");
        newState.gameStage = 1;
        return newState;

      default:
        throw ("reducer got an unknown action: ", action.type);
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const { gameStage } = state;

  useEffect(() => {
    if (gameStage === 1) {
      setTimeout(() => {
        dispatch({ type: "PLAY_TOP_CARD", data: "opponent" });
      }, 1000);
    }
    if (gameStage === 3) {
      setTimeout(() => {
        dispatch({ type: "ROUND_WIN" });
      }, 1500);
    }
    if (gameStage === 4) {
      setTimeout(() => {
        dispatch({ type: "ADVANCE_ROUND" });
      }, 1000);
    }
    if (gameStage === 5) {
      // somebody is out of cards!
      setTimeout(() => {
        dispatch({ type: "SOMEBODY_LOST" });
      }, 3000);
    }
  }, [gameStage]);

  return [state, dispatch];
}

export default useGameState;
