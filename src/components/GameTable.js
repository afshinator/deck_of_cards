import GameStats from "./GameStats";
import Player from "./Player";
import VisiblePlayingCard from "./VisiblePlayingCard";
import FaceDownStack from "./FaceDownStack";
import { ANIM_IN_LEFT } from "../constants";
import { useContext } from "react";
import { GameContext } from "./GameOfLuck";

const luckCardGameMachine = Machine({
  id: 'luckGame',
  initial: 'start',
  context: {
    usersPlay: null,
    oppsPlay: null,
    usersCards: [],
    oppsCards: []
  },
  states: {
    start: {
      entry: ['instantiate'],
      on: {
        INIT: 'shuffle'
      }
    },
    shuffle: {
      entry: ['shuffle'],
      on: {
        START: 'play_game'
      }
    },
    play_game: {
      type: 'final'
    },
    failure: {
      on: {
        RETRY: {
          target: 'loading',
          actions: assign({
            retries: (context, event) => context.retries + 1
          })
        }
      }
    }
  }
},{
  actions: {
    instantiate: (context, event) => {
      // deck = new DeckOfCards();
    },
    shuffle: (context, event) => {
      // deck = shuffle();
    }      
  }
});

function GameTable({ gameState, children, ...rest }) {
  const [tableState, send] = useMachine(luckGameMachine);

  if ( gameState.gameStage === "GAME_IN_PROGRESS" ) {
    send('READY_TO_START')
  }

  const userDeckClickHandler = function (e) {
    console.log("user click handler cuaght");
    // if (e.shiftKey) logOutState()
    // if (state.gameStage === 2) {
    //   dispatch({ type: "PLAY_TOP_CARD", data: "user" });
    // }
  };
  console.log('GameTable ', gameState)
  return (
    <div className="gameTable" role="main">
      {children}
      {/* <GameStats state={state} /> */}

      <Player who="user" clickHandler={userDeckClickHandler} />
      <Player who="opponent" />
    </div>
  );
}

GameTable.Dealer = function Dealer({ children, clickHandler, ...rest }) {
  const state = useContext(GameContext);
  // console.log(".dealer ", state);
  if (state.gameStage === "GAME_IN_PROGRESS") return null;
  return (
    <section className="dealer">
      <FaceDownStack clickHandler={clickHandler} animClass={ANIM_IN_LEFT} />
    </section>
  );
};

export default GameTable;
