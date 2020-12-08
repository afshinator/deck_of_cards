
const { default: GameOfLuck } = require("./components/GameOfLuck");

function App() {
  return (
    <div className="App">
      <header>
        <p className="animate__animated animate__flipInY">🃏</p>
        <h1 className="animate__animated animate__zoomInDown">Luck Card Game</h1>
        <p className="animate__animated animate__flipInY">🃏</p>
      </header>
      <GameOfLuck />
    </div>
  );
}

export default App;
