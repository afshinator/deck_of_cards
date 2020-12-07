import FaceDownStack from './FaceDownStack';
import VisiblePlayingCard from './VisiblePlayingCard';
import { ANIM_IN_LEFT, ANIM_TADA } from "../constants";

function CardPlaceHolder() {
  return <div className="placeHolder"></div>;
}

function Player(props) {
  const { who, state, clickHandler } = props;
  const {
    gameStage,
    usersUnplayedCards,
    usersCardsInPlay,
    usersWins,
    opponentsUnplayedCards,
    opponentsCardsInPlay,
    opponentsWins,
  } = state;

  const isUser = who === "user"; // else is "opponent"
  const cardsInPlay = isUser ? usersCardsInPlay : opponentsCardsInPlay;
  const unplayedCards = isUser ? usersUnplayedCards : opponentsUnplayedCards;
  const wins = isUser ? usersWins : opponentsWins;

  const winCheck =
    gameStage === 3 &&
    (isUser
      ? usersCardsInPlay[0].rank > opponentsCardsInPlay[0].rank
      : usersCardsInPlay[0].rank < opponentsCardsInPlay[0].rank);

  return (
    <section className={`${who}`}>
      {cardsInPlay.length ? (
        winCheck ? (
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
      ) : (
        <CardPlaceHolder />
      )}
      {unplayedCards.length ? (
        <FaceDownStack animClass={ANIM_IN_LEFT} clickHandler={clickHandler} />
      ) : (
        <CardPlaceHolder />
      )}
      {wins.length ? (
        <FaceDownStack clickHandler={clickHandler} />
      ) : (
        <CardPlaceHolder />
      )}
    </section>
  );
}
export default Player;
