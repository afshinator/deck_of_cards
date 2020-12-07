import { ANIM_IN_LEFT } from "../constants";
import FaceDownStack from "./FaceDownStack";

function Dealer({ gameStage, dealerDeckClickHandler }) {
  return (
    <section className="dealer">
      {gameStage < 1 ? (
        <FaceDownStack
          clickHandler={dealerDeckClickHandler}
          animClass={ANIM_IN_LEFT}
        />
      ) : null}
    </section>
  );
}

export default Dealer;