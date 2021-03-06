import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";
import "./Home.css";
import Modal from "../../components/modal/Modal";
const Home = () => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(true);

  const handleClickEvent = (event: React.MouseEvent) => {
    if (inputValue && inputValue !== "") {
      dispatch(setUser(inputValue));
      history.push("/game");
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let currentValue = event.currentTarget.value;
    if (currentValue && currentValue !== "") {
      setInputValue(event.currentTarget.value);
    } else {
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key==='Enter');
    if (event.key === 'Enter') {
      if (inputValue && inputValue !== "") {
        dispatch(setUser(inputValue));
        history.push("/game");
      }
    }
  };

  return (
    <div className="content">
      <h5 className="title">Hello friend, tell me your name...</h5>
      <input
        className="input"
        type="text"
        onKeyDown={handleEnter}
        onChange={handleInput}
        placeholder="Your name here"
      ></input>
      <button className="button" onClick={handleClickEvent}>
        Let's go
      </button>
    </div>
  );
};
export default Home;
