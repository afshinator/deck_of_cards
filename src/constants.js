const CARDS_IN_A_DECK = 52; // not couting jokers
const RANKS_PER_SUITE = 13; // 1-10 plus Jack, Queen, King
const SUITES = "♠︎ ♥︎ ♣︎ ♦︎".split(" ");

const ANIM_IN_LEFT = "animate__fadeInLeftBig"; // animate.css classes
const ANIM_TADA = "animate__tada";
const ANIM_WARALERT = "animate__pulse";

const USER_MESSAGES = {
  0: (
    <span>
      Welcome to{" "}
      <a href="https://en.wikipedia.org/wiki/War_(card_game)" target="_new">
        <strong>War</strong>
      </a>
      .<strong> Click on the dealers deck</strong> to start the game and test
      your luck.
    </span>
  ),
  2: (
    <span className="animate__animated animate__fadeIn">
      Your opponent showed his top card, now
      <strong> click on your deck to play your top card</strong>.
    </span>
  ),
  3: <span></span>,
  4: <span>Go again!</span>,
  5: <span>Out of cards means game over!</span>,
};

// UTF-8 Playing card characters
const CARD_CHARS = {
  joker1: "🂿", // 'red joker'
  joker2: "🃏", // 'black joker'
  joker3: "🃟", // 'white joker'
  backface: "🂠", // when a card is face-down
  "♠︎": ["🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧", "🂨", "🂩", "🂪", "🂫", "🂭", "🂮"],
  "♥︎": ["🂱", "🂲", "🂳", "🂴", "🂵", "🂶", "🂷", "🂸", "🂹", "🂺", "🂻", "🂽", "🂾"],
  "♣︎": ["🃑", "🃒", "🃓", "🃔", "🃕", "🃖", "🃗", "🃘", "🃙", "🃚", "🃛", "🃝", "🃞"],
  "♦︎": ["🃁", "🃂", "🃃", "🃄", "🃅", "🃆", "🃇", "🃈", "🃉", "🃊", "🃋", "🃍", "🃎"],
};

export {
  SUITES,
  RANKS_PER_SUITE,
  CARDS_IN_A_DECK,
  USER_MESSAGES,
  CARD_CHARS,
  ANIM_IN_LEFT,
  ANIM_TADA,
};
