
import useGameState from "./useGameState";


function GameOfLuck() {
  const [state, dispatch] = useGameState();
  console.log("State in Game:", state);

  return (
    <div className="gameArea">

    </div>
  );
}

export default GameOfLuck;