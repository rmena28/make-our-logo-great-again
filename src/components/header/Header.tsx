import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { restartGame } from "../../redux/actions/gameActions";
import { GameState } from "../../redux/reducers/gameReducer";
import { GlobalStateDefinition } from "../../redux/rootReducer";
import Modal from "../modal/Modal";
import "./Header.css";

const modalRoot = document.getElementById("modal-dialog") as HTMLDivElement;

const Header = () => {
  const name = useSelector<GlobalStateDefinition>(
    (state) => state.user.name
  ) as string;
  const { started, wrongPlacement, gameEnded } =
    useSelector<GlobalStateDefinition>((state) => state.game) as GameState;
  const [time, setTime] = useState(0);
  const [timeInterval, setTimeInterval] = useState<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    let timerInterval: any;
    if (started) {
      if (!timeInterval) {
        let interval = setInterval(() => {
          setTime((currrent) => currrent + 1);
        }, 1000);
        setTimeInterval(interval);
      }
    } else {
      if (timeInterval) {
        try {
          clearInterval(timeInterval);
        } catch (error) {}
      }
    }
    return () => {
      try {
        clearInterval(timerInterval);
      } catch (error) {}
    };
  }, [started, timeInterval]);

  //Wrong placement
  useEffect(() => {
    if (wrongPlacement > 0) {
      setTime((current) => current + 10);
    }
  }, [wrongPlacement]);

  const restart = () => {
    dispatch(restartGame());
    setTime(0);
    setTimeInterval(null);
  };
  return (
    <header className="header">
      <label className="name">Good luck, {name}</label>
      <div className="timer">Your score: {time} seconds</div>
      {modalRoot
        ? ReactDOM.createPortal(
            <Modal
              title="Congratulations!!"
              open={(gameEnded!==undefined && gameEnded)||false}
              onClose={() => restart()}
            >
              <div className="message-container">
                <label>You have made our logo great again!</label>
                <label className="score">Score: {time} seconds</label>
              </div>
            </Modal>,
            modalRoot
          )
        : null}
    </header>
  );
};

export default Header;
