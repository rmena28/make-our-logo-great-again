import { GameReducerProps } from "../reducers/gameReducer";
import GameTypes from "../types/GameTypes";


export const setGameStart = (): GameReducerProps => {
  return {
    type: GameTypes.SET_START,
  };
};

export const setWrongPlacementPenalty = (): GameReducerProps => {
  return {
    type: GameTypes.SET_WRONG_PLACEMENT,
  };
};

export const restartGame = (): GameReducerProps=>{
  return {
    type: GameTypes.SET_RESTART
  }
}

export const setGameEnded = ():GameReducerProps=>{
  return {
    type: GameTypes.SET_GAME_ENDED
  }
}
