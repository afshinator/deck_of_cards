
import { useEffect, useReducer } from 'react';
import { DeckOfCards } from '../DeckOfCards';

const INITIAL_STATE = {
  deck: null, // will hold the DeckOfCards instance
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
    const newState = { ...state };
    let temp = null;
  
    function playTop(who, faceUp = false) {
      const unplayed = newState[`${who}sUnplayedCards`];
      const wins = newState[`${who}sWins`];
      const inPlay = newState[`${who}sCardsInPlay`];
  
      // replenish from wins if unplayed stack is almost empty
      if (unplayed.length < 2 && wins) {
        while (wins.length) {
          unplayed.unshift(wins.pop());
        }
      }
      if (unplayed.length < 1) {
        // this player ran out of cards
        console.log("THIS PLAYER LOST: ", who);
        return false;
      } else {
        inPlay.push(unplayed.pop());
        if (faceUp) inPlay[inPlay.length - 1].facing = "up";
        return true;
      }
    }
  
    switch (action.type) {
      case "INIT_NEW_DECK":
        newState.deck = new DeckOfCards();
        return newState;
  
      case "START_GAME":
        // Shuffle the deck, deal 26 cards each to players, advance stage
        newState.deck.shuffle();
        newState.usersUnplayedCards = newState.deck.dealOffTop(3);
        newState.opponentsUnplayedCards = newState.deck.dealOffTop(3);
        newState.gameStage++;
        return newState;
  
      case "PLAY_TOP_CARD":
        if (playTop(action.data, true)) {
          newState.gameStage++;
        } else {
          newState.gameStage = 5;
        }
        return newState;
  
      case "WAR_ALERT":
        newState.warAlert = true;
        return newState;
  
      case "WAR":
        newState.warAlert = false;
        temp = true; // use temp var to short circuit other calls if one fails
        temp = temp && playTop("opponent");
        temp = temp && playTop("user");
        temp = temp && playTop("opponent");
        temp = temp && playTop("user");
        temp = temp && playTop("opponent");
        temp = temp && playTop("user");
        newState.gameStage = temp ? 1 : 5;
        return newState;
  
      case "ROUND_WIN":
        temp =
          action.data === "opponent"
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
        newState.gameStage = 1;
        return newState;
  
      default:
        throw ("reducer got an unknown action: ", action.type);
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    gameStage,
    usersCardsInPlay,
    opponentsCardsInPlay,
  } = state;
  
  useEffect(() => {
    dispatch({ type: "INIT_NEW_DECK" });
  }, []);

  useEffect(() => {
    if (gameStage === 1) {
      setTimeout(() => {
        dispatch({ type: "PLAY_TOP_CARD", data: "opponent" });
      }, 1000);
    }
    if (gameStage === 3) {
      const userRank = usersCardsInPlay[0].rank;
      const opponentRank = opponentsCardsInPlay[0].rank;

      setTimeout(() => {
        if (userRank < opponentRank) {
          dispatch({ type: "ROUND_WIN", data: "opponent" });
        } else if (userRank > opponentRank) {
          dispatch({ type: "ROUND_WIN", data: "user" });
        }
      }, 1500);
    }
    if (gameStage === 4) {
      setTimeout(() => {
        dispatch({ type: "ADVANCE_ROUND" });
      }, 1000);
    }
    if (gameStage === 5) {
      // somebody is out of cards!
      console.log("stage 5: somebody is out of cards");
      setTimeout(() => {
        dispatch({ type: "SOMEBODY_LOST" });
      }, 3000);
    }
  }, [gameStage]);

  return [state, dispatch]
}

export default useGameState