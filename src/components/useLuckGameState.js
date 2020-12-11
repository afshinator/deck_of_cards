
import {DeckOfCards} from '../DeckOfCards'
import { simpleDeepCopy } from '../utils';
import { useReducer } from 'react';
import { useEffect } from 'react';

const INITIAL_STATE = {
  gameStage: "PRE_INIT",
};

export function useLuckGameState(initialState = INITIAL_STATE) {
  const deck = new DeckOfCards();
  function reducer(state, action) {
    const newState = simpleDeepCopy(state);

    switch (action.type) {
      case "INITIALIZE":
        newState.gameStage = "INITED";
        return newState;
      case "SHUFFLE":
        deck.shuffle();
        newState.gameStage = "READY_TO_START";
        return newState;
      case "GAME_IN_PROGRESS":
        newState.gameStage = "GAME_IN_PROGRESS";
        console.log("go!");
        return newState;
      case "GAMEEND":
        return newState;
  
      default:
        throw new Error("GameOfLUck reducer doesnt recognize that action");
    }
  }
  const [gameState, gsDispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    switch (gameState.gameStage) {
      case "PRE_INIT":
        gsDispatch({ type: "INITIALIZE" });
        break;
      case "INITED":
        gsDispatch({ type: "SHUFFLE" });
        break;
      default:
        console.log("gameStage default in effect ", gameState.gameStage);
        break;
    }
  }, [gameState.gameStage]);

  return [gameState, gsDispatch]
}
