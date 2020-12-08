import { useEffect, useReducer } from "react";
import { simpleDeepCopy } from "../utils";

const INITIAL_STATE = {
  gameStage: 0, // will help synchronize state with stages in game
  roundsInPlay: 0, // to keep track of how long the game goes on
  usersUnplayedCards: [],
  usersCardsInPlay: [],
  opponentsUnplayedCards: [],
  opponentsCardsInPlay: [],
};

function useGameState(initialState = INITIAL_STATE) {
  const reducer = (state, action) => {
    const newState = simpleDeepCopy(state);
    let temp = null;

    function playTop(who, faceUp = false) {
      const unplayed = newState[`${who}sUnplayedCards`];
      const inPlay = newState[`${who}sCardsInPlay`];

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

      case "ROUND_WIN": // Stage 3
        if (
          // Both players have same card; select random winner
          newState.usersCardsInPlay[0].rank ===
          newState.opponentsCardsInPlay[0].rank
        ) {
          if (Math.random() >= 0.5) {
            temp = newState.opponentsUnplayedCards;
          } else {
            temp = newState.usersUnplayedCards;
          }
        } else
          temp =
            newState.usersCardsInPlay[0].rank <
            newState.opponentsCardsInPlay[0].rank
              ? newState.opponentsUnplayedCards
              : newState.usersUnplayedCards;

        // Randomize order in which won cards are added to bottom
        // of winners stack to help eliminate stalemates.
        if (Math.random() >= 0.5) {
          temp.unshift(newState.usersCardsInPlay.pop());
          temp.unshift(newState.opponentsCardsInPlay.pop());
        } else {
          temp.unshift(newState.opponentsCardsInPlay.pop());
          temp.unshift(newState.usersCardsInPlay.pop());
        }

        newState.roundsInPlay++;
        if (
          // check for somebody having won...
          newState.opponentsUnplayedCards.length === 0 ||
          newState.usersUnplayedCards.length === 0
        ) {
          newState.gameStage = 5;
        } else {
          newState.gameStage = 4;
        }

        return newState;

      case "ADVANCE_ROUND": // Stage 4
        newState.gameStage = 1;
        return newState;

      case "SOMEBODY_LOST": // Stage 5
        return INITIAL_STATE;

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
