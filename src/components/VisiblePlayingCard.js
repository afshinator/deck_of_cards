import { CARD_CHARS } from "../constants.js";

function VisiblePlayingCard({
  suite,
  rank,
  facing,
  jokersId,
  classes = "",
  css = {},
}) {
  let ch;

  if (facing === "down") {
    ch = CARD_CHARS["backface"];
  } else if (jokersId) {
    ch = jokersId === 1 ? CARD_CHARS["joker1"] : CARD_CHARS["joker2"];
  } else {
    ch = CARD_CHARS[suite][rank - 1];
  }

  let allClasses = classes;
  if (facing !== "down") {
    if (suite === "♥︎" || suite === "♦︎") {
      allClasses += " redCard";
    } else allClasses += " blackCard";
  } else {
    allClasses += " backface";
  }
  return (
    <span className={`visibleCard animate__animated ${allClasses}`} style={css}>
      {ch}
    </span>
  );
}

export default VisiblePlayingCard;
