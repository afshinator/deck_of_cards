import * as React from "react";
import FaceDownStack from "./FaceDownStack";
import VisiblePlayingCard from "./VisiblePlayingCard";
import { ANIM_IN_LEFT, ANIM_TADA } from "../constants";

function CardPlaceHolder() {
  return <div className="placeHolder"></div>;
}

function Player(props) {
  const { who } = props;

  // Give all the top level children the props 
  const kids = React.Children.map(props.children, (child) =>
    React.cloneElement(child, { props })
  );

  // Render all the children who now have all Player's props
  return (
    <section className={`${who}`}>
      {kids}
    </section>
  );
}

Player.CardsInPlay = function ({ props }) {
  const isUser = props.who === "user";
  const cardsInPlay = isUser
    ? props.state.usersCardsInPlay
    : props.state.opponentsCardsInPlay;
  const winCheck =
    props.state.gameStage === 3 &&
    (isUser
      ? props.state.usersCardsInPlay[0].rank >
        props.state.opponentsCardsInPlay[0].rank
      : props.state.usersCardsInPlay[0].rank <
        props.state.opponentsCardsInPlay[0].rank);
  
  if ( cardsInPlay.length ) {
    return  winCheck ? (
      <VisiblePlayingCard
        suite={cardsInPlay[0].suite}
        rank={cardsInPlay[0].rank}
        facing={cardsInPlay[0].facing}
        classes={ANIM_TADA}
      />
    ) : (
      <VisiblePlayingCard
        suite={cardsInPlay[0].suite}
        rank={cardsInPlay[0].rank}
        facing={cardsInPlay[0].facing}
      />
    )
  } else {
    return <CardPlaceHolder />;
  }
};

Player.UnplayedCards = function ({ props, children }) {
  const isUser = props.who === "user";
  const unplayedCards = isUser
    ? props.state.usersUnplayedCards
    : props.state.opponentsUnplayedCards;
  const slideInOnce = props.state.roundsInPlay < 1 ? ANIM_IN_LEFT : "";
  if (unplayedCards.length) {
    return (
      <FaceDownStack
        animClass={slideInOnce}
        clickHandler={props.clickHandler}
      />
    );
  } else {
    return <CardPlaceHolder />;
  }
};

export default Player;
