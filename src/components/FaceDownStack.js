import VisiblePlayingCard from './VisiblePlayingCard';

/* Simulate a stack of cards */
function FaceDownStack({ animClass, clickHandler, rotate=0 }) {
  let classes = `dealersDeck animate__animated ${animClass}`;

  return (
    <div className={classes} onClick={clickHandler}>
      <VisiblePlayingCard
        facing="down"
        css={{  transform: `rotate(${rotate}deg)` }}
      />
    </div>
  );
}

export default FaceDownStack;
