import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import GameContainer from "../../components/game-container/GameContainer";
import Header from "../../components/header/Header";
import { GlobalStateDefinition } from "../../redux/rootReducer";
import './Game.css';

const Game = () => {
  const history = useHistory();
  const name = useSelector<GlobalStateDefinition>(
    (state) => state.user.name
  ) as string;
  useEffect(() => {
    if (!name) {
        history.push("/");
    }
  }, [name, history]);
  return (
    <>
      <div className="container">
        <Header></Header>
        <GameContainer></GameContainer>
      </div>
    </>
  );
};
export default Game;
