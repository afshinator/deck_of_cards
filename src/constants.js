const CARDS_IN_A_DECK = 52; // not couting jokers
const RANKS_PER_SUITE = 13; // 1-10 plus Jack, Queen, King
const SUITES = "♠︎ ♥︎ ♣︎ ♦︎".split(" ");

const ANIM_IN_LEFT = "animate__fadeInLeftBig"; // animate.css classes
const ANIM_TADA = "animate__tada";

const USER_MESSAGES = {
  0: (
    <span>
      Each player deals off the top of the deck, high card wins and is added to your stack.<br />
      Whoever runs out of cards first loses. Good luck!<br />
      <strong>Click on dealers deck to start the game.</strong>
    </span>
  ),
  2: (
    <span className="animate__animated animate__fadeIn">
      Your opponent drew, 
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
